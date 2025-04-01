import type { QWidget } from './base';

export interface QTableView extends QWidget {
    // Add table view specific methods as needed
}

export const QTableView: {
    new (): QTableView;
}; 