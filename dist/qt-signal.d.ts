export declare class Signal<T> {
    private value;
    private listeners;
    constructor(initialValue: T);
    get(): T;
    emit(newValue: T): void;
    connect(listener: (value: T) => void): () => void;
}
export declare function withSignals<T>(target: T): T & {
    createSignal: <T_1>(name: string, initialValue: T_1) => Signal<T_1>;
    getSignal: <T_1>(name: string) => Signal<T_1>;
};
