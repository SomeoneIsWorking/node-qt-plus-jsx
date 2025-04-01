import type { QObject } from "./base";

export interface QWidget extends QObject {
  setWindowTitle(title: string): void;
  show(): void;
  setLayout(layout: QLayout): void;
  resize(width: number, height: number): void;
}

export const QWidget: {
  new (): QWidget;
};
