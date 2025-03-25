export declare class Signal<T> {
    private value;
    private listeners;
    constructor(initialValue: T);
    get(): T;
    emit(newValue: T): void;
    connect(listener: (value: T) => void): this;
    private notify;
}
