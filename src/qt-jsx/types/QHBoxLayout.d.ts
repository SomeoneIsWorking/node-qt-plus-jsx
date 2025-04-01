import type { QLayout } from './base';

export interface QHBoxLayout extends QLayout {
    // Add horizontal layout specific methods as needed
}

export const QHBoxLayout: {
    new (): QHBoxLayout;
}; 