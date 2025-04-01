import type { QWidget } from './base';

export interface QPushButton extends QWidget {
    setText(text: string): void;
    clicked(callback: () => void): void;
}

export const QPushButton: {
    new (text?: string): QPushButton;
}; 