import type { QWidget } from './base';

export interface QLabel extends QWidget {
    setText(text: string): void;
}

export const QLabel: {
    new (text: string): QLabel;
}; 