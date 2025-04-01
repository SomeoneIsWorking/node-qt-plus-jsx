export interface QWidget {
  setWindowTitle(title: string): void;
  show(): void;
  setLayout(layout: QLayout): void;
  resize(width: number, height: number): void;
  deleteLater(): void;
}

export interface QLayout {
  addWidget(widget: QWidget): void;
  addLayout(layout: QLayout): void;
  removeWidget(widget: QWidget): void;
  removeItem(item: QLayout): void;
}
