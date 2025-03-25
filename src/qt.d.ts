declare module "*/node-qt.node" {
  export class QWidget {
    setWindowTitle(title: string): void;
    resize(width: number, height: number): void;
    setLayout(layout: QLayout): void;
    show(): void;
    deleteLater(): void;
  }

  export class QApplication {
    exec(): void;
  }

  export class QVBoxLayout {
    addWidget(widget: QWidget): void;
    addLayout(layout: QLayout): void;
    count(): number;
    takeAt(index: number): QLayoutItem;
  }

  export class QHBoxLayout {
    addWidget(widget: QWidget): void;
    addLayout(layout: QLayout): void;
    count(): number;
    takeAt(index: number): QLayoutItem;
  }

  export class QPushButton {
    constructor(text?: string);
    clicked(callback: () => void): void;
  }

  export class QLabel {
    constructor(text?: string);
    setText(text: string): void;
  }

  export class QLineEdit {
    constructor(text?: string);
    setText(text: string): void;
    textChanged(callback: (text: string) => void): void;
  }

  export class QTableView {
    constructor();
  }

  export class QLayout {
    addWidget(widget: QWidget): void;
    addLayout(layout: QLayout): void;
  }

  export class QLayoutItem {
    widget(): QWidget | null;
  }
} 