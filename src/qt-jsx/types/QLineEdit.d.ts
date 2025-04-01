import type { QWidget } from './base';

export interface QLineEdit extends QWidget {
    setText(text: string): void;
    text(): string;
    textChanged(callback: (text: string) => void): void;
}

export const QLineEdit: {
    new (): QLineEdit;
}; 