import type { QLayout } from './base';

export interface QVBoxLayout extends QLayout {
    // Add vertical layout specific methods as needed
}

export const QVBoxLayout: {
    new (): QVBoxLayout;
}; 