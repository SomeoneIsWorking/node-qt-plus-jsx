import type { QObject } from './base';

export interface QPushButton extends QObject {
    setText(text: string): void;
    clicked(callback: () => void): void;
}

export const QPushButton: {
    new (text?: string): QPushButton;
}; 