// Signal class for reactive state management
let currentComputation: (() => void) | null = null;

export class Signal<T> {
    private value: T;
    private listeners: ((value: T) => void)[] = [];
    private computations: Set<() => void> = new Set();

    constructor(initialValue: T) {
        this.value = initialValue;
    }

    get(): T {
        if (currentComputation) {
            this.computations.add(currentComputation);
        }
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
        // Notify all dependent computations
        this.computations.forEach(computation => computation());
    }
}

export function createSignal<T>(initialValue: T): Signal<T> {
    return new Signal(initialValue);
}

export type SignalOrValue<T> = T | Signal<T>;

export function getValue<T>(value: SignalOrValue<T> | undefined): T | undefined {
    return isSignal(value) ? value.get() : value;
}

export function bindIfSignal<T>(value: SignalOrValue<T>, callback: (value: T) => void) {
    if (isSignal(value)) {
        value.connect(callback);
    }
}

export function isSignal<T>(value: SignalOrValue<T> | undefined): value is Signal<T> {
    return value instanceof Signal;
}

export function computed<T>(computation: () => T): Signal<T> {
    const result = new Signal<T>(computation());
    
    const updateComputation = () => {
        const prevComputation = currentComputation;
        currentComputation = updateComputation;
        const value = computation();
        currentComputation = prevComputation;
        result.set(value);
    };
    
    // Initial computation
    updateComputation();
    
    return result;
} 