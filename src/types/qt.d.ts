declare global {
    class QApplication {
        constructor();
        exec(): number;
        static instance(): QApplication;
    }

    class QWidget {
        type: string;
        props: any;
        children?: JSX.Element[];

        constructor();
        setLayout(layout: QLayout): void;
        show(): void;
        setWindowTitle(title: string): void;
        resize(width: number, height: number): void;
        deleteLater(): void;
        layout(): QLayout | null;
        parentWidget(): QWidget | null;
    }

    class QMainWindow extends QWidget {
        constructor();
        setCentralWidget(widget: QWidget): void;
        show(): void;
    }

    class QLayout {
        type: string;
        props: any;
        children?: JSX.Element[];

        constructor();
        addWidget(widget: QWidget): void;
        count(): number;
        takeAt(index: number): QLayoutItem;
        replaceWidget(oldWidget: QWidget, newWidget: QWidget): void;
    }

    class QLayoutItem {
        widget(): QWidget | null;
    }

    class QVBoxLayout extends QLayout {}

    class QHBoxLayout extends QLayout {}

    class QPushButton extends QWidget {
        clicked: Signal<void>;
        setText(text: string): void;
    }

    class QLabel extends QWidget {
        setText(text: string): void;
    }

    class QLineEdit extends QWidget {
        textChanged: Signal<string>;
    }
}

export {}; 