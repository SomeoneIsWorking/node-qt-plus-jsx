import type { QObject } from './base';

export interface QTableView extends QObject {
    // Add table view specific methods as needed
}

export const QTableView: {
    new (): QTableView;
}; 