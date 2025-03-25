import { Signal } from "../signal";
import { ReactiveList } from "../reactive-list";

type SignalOrValue<T> = T | Signal<T>;

declare global {
    namespace JSX {
        interface ElementClass {
            render(): JSX.Element;
        }

        interface ElementChildrenAttribute { 
            children?: JSXChildren; 
        }

        interface Element {
            type: string | Function;
            props: {
                children?: JSXChildren;
                text?: SignalOrValue<string>;
                onClick?: () => void;
                onChange?: (text: string) => void;
                title?: string;
                width?: number;
                height?: number;
                x?: number;
                y?: number;
                items?: ReactiveList<any>;
            };
        }
        
        interface IntrinsicElements {
            widget: { children?: JSXChildren };
            vbox: { children?: JSXChildren };
            hbox: { children?: JSXChildren };
            button: { onClick?: () => void; text?: SignalOrValue<string>; children?: JSXChildren };
            label: { text?: SignalOrValue<string>; children?: JSXChildren };
            input: { onChange?: (text: string) => void; text?: SignalOrValue<string> };
            application: { children?: JSXChildren };
            window: { title?: string; width?: number; height?: number; children?: JSXChildren };
            table: { children?: JSXChildren };
            list: { items: ReactiveList<any>; children?: JSXChildren };
            template: { children?: JSXChildren };
        }

        interface IntrinsicAttributes {
            children?: JSXChildren;
        }

        interface IntrinsicClassAttributes<T> {
            children?: JSXChildren;
        }

        type ReactNode = JSX.Element | (JSX.Element | typeof QWidget)[] | null | undefined;
        type FunctionComponent<P = {}> = (props: P) => ReactNode;
    }
}

export interface JSXElement extends JSX.Element {}
export type JSXChild = JSX.Element | typeof QWidget;
export type JSXChildren = JSXChild[] | JSXChild; 