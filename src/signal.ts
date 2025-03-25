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

    set(newValue: T) {
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

export function createSignal<T>(initialValue: T): Signal<T> {
    return new Signal(initialValue);
}

type SignalOrValue<T> = T | Signal<T>;

export function getValue<T>(value: SignalOrValue<T>): T {
    return isSignal(value) ? value.get() : value;
}

export function bindIfSignal<T>(value: SignalOrValue<T>, callback: (value: T) => void) {
    if (isSignal(value)) {
        value.connect(callback);
    }
}

export function isSignal<T>(value: SignalOrValue<T>): value is Signal<T> {
    return value instanceof Signal;
} 