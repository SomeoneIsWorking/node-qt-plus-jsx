import type { QWidget } from "./base";

export interface QMainWindow extends QWidget {
  setWindowTitle(title: string): void;
  setCentralWidget(widget: QWidget): void;
  setLayout(layout: any): void;
  resize(width: number, height: number): void;
} 