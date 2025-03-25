declare const QWidget: any;
declare const QApplication: any;
export interface JSXElement {
    type: string | Function;
    props: {
        children?: (JSXElement | typeof QWidget)[];
        text?: string;
        onClick?: () => void;
        onChange?: (text: string) => void;
        title?: string;
        width?: number;
        height?: number;
        x?: number;
        y?: number;
    };
}
export declare function createElement(type: string | Function, props: any, ...children: any[]): JSXElement;
export declare function createWidget(element: JSXElement, parentWidget?: QWidget): any;
export { QWidget, QApplication };
