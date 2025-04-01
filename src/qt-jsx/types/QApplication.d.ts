export interface QApplication {
    exec(): number;
}

export const QApplication: {
    new (): QApplication;
}; 