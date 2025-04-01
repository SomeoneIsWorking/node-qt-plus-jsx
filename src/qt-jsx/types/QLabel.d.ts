import type { QObject } from './base';

export interface QLabel extends QObject {
    setText(text: string): void;
}

export const QLabel: {
    new (text: string): QLabel;
}; 