export interface QObject {
  deleteLater(): void;
}

export interface QLayout {
  addWidget(widget: QObject): void;
  addLayout(layout: QLayout): void;
  removeWidget(widget: QObject): void;
  removeItem(item: QLayout): void;
}
