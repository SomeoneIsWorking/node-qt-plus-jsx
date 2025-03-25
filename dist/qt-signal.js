export class Signal {
    constructor(initialValue) {
        this.listeners = [];
        this.value = initialValue;
    }
    get() {
        return this.value;
    }
    emit(newValue) {
        this.value = newValue;
        this.listeners.forEach(listener => listener(newValue));
    }
    connect(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}
// Mixin to add signal support to Qt components
export function withSignals(target) {
    const signals = new Map();
    return {
        ...target,
        createSignal: function (name, initialValue) {
            const signal = new Signal(initialValue);
            signals.set(name, signal);
            return signal;
        },
        getSignal: function (name) {
            const signal = signals.get(name);
            if (!signal) {
                throw new Error(`Signal ${name} not found`);
            }
            return signal;
        }
    };
}
