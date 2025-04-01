import type { QWidget as QWidgetBase } from './base';

export interface QWidget extends QWidgetBase {}

export const QWidget: {
    new (): QWidget;
}; 