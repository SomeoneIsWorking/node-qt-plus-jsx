export class Signal<T> {
    private value: T;
    private listeners: ((value: T) => void)[] = [];

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    get(): T {
        return this.value;
    }

    emit(newValue: T) {
        this.value = newValue;
        this.listeners.forEach(listener => listener(newValue));
    }

    connect(listener: (value: T) => void) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

// Mixin to add signal support to Qt components
export function withSignals<T>(target: T) {
    const signals = new Map<string, Signal<any>>();

    return {
        ...target,
        createSignal: function<T>(name: string, initialValue: T): Signal<T> {
            const signal = new Signal<T>(initialValue);
            signals.set(name, signal);
            return signal;
        },
        getSignal: function<T>(name: string): Signal<T> {
            const signal = signals.get(name);
            if (!signal) {
                throw new Error(`Signal ${name} not found`);
            }
            return signal as Signal<T>;
        }
    };
} 