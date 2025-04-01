import { QObject } from "./base";

export interface QApplication extends QObject {
    exec(): number;
}

export const QApplication: {
    new (): QApplication;
}; 