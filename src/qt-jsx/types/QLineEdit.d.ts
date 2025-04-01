import type { QObject } from './base';

export interface QLineEdit extends QObject {
    setText(text: string): void;
    text(): string;
    textChanged(callback: (text: string) => void): void;
}

export const QLineEdit: {
    new (): QLineEdit;
}; 