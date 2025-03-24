declare global {
    namespace JSX {
        interface ElementClass {
            render(): Element;
        }

        interface ElementChildrenAttribute { 
            children?: (Element | typeof QWidget)[]; 
        }

        interface Element {
            type: string | Function;
            props: {
                children?: (Element | typeof QWidget)[];
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
        
        interface IntrinsicElements {
            widget: { children?: (Element | typeof QWidget)[] };
            vbox: { children?: (Element | typeof QWidget)[] };
            hbox: { children?: (Element | typeof QWidget)[] };
            button: { onClick?: () => void; text?: string; children?: (Element | typeof QWidget)[] };
            label: { text?: string; children?: (Element | typeof QWidget)[] };
            input: { onChange?: (text: string) => void; text?: string };
            application: { children?: (Element | typeof QWidget)[] };
            window: { title?: string; width?: number; height?: number; children?: (Element | typeof QWidget)[] };
        }

        interface IntrinsicAttributes {
            children?: (Element | typeof QWidget)[];
        }

        interface IntrinsicClassAttributes<T> {
            children?: (Element | typeof QWidget)[];
        }

        type ReactNode = Element | (Element | typeof QWidget)[] | null | undefined;
        type FunctionComponent<P = {}> = (props: P) => ReactNode;
    }
}

export {}; 