// Signal class for reactive state management
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
        this.notify();
    }
    connect(listener) {
        this.listeners.push(listener);
        return this;
    }
    notify() {
        this.listeners.forEach(listener => listener(this.value));
    }
}
