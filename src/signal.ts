// Signal class for reactive state management
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
        this.notify();
    }

    connect(listener: (value: T) => void) {
        this.listeners.push(listener);
        return this;
    }

    private notify() {
        this.listeners.forEach(listener => listener(this.value));
    }
} 