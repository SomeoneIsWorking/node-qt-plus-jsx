declare global {
    class Signal<T> {
        connect(callback: (value: T) => void): void;
        disconnect(callback: (value: T) => void): void;
    }

    class QLayoutItem {
        widget(): QWidget | null;
    }

    class QLayout {
        constructor();
        addWidget(widget: QWidget): void;
        count(): number;
        takeAt(index: number): QLayoutItem;
    }
}

export {}; 