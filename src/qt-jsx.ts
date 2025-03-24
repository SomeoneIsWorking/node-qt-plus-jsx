import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");

// Qt components
const QWidget = qt.QWidget;
const QVBoxLayout = qt.QVBoxLayout;
const QHBoxLayout = qt.QHBoxLayout;
const QPushButton = qt.QPushButton;
const QLabel = qt.QLabel;
const QLineEdit = qt.QLineEdit;
const QApplication = qt.QApplication;

// JSX support
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

export function createElement(
  type: string | Function,
  props: any,
  ...children: any[]
): JSXElement {
  return {
    type,
    props: {
      ...props,
      children: children,
    },
  };
}

export function createWidget(element: JSXElement): any {
  if (typeof element.type === "function") {
    const result = element.type(element.props);
    return createWidget(result);
  }

  switch (element.type) {
    case "application": {
      const app = new QApplication();
      if (element.props.children) {
        createWidget(element.props.children[0]);
      }
      return app;
    }

    case "window": {
      const window = new QWidget();
      if (element.props.title) {
        window.setWindowTitle(element.props.title);
      }
      if (element.props.width && element.props.height) {
        window.resize(element.props.width, element.props.height);
      }

      if (element.props.children) {
        element.props.children.forEach((child) => {
          const childWidget = createWidget(child as JSXElement);
          if (childWidget instanceof QWidget) {
            window.setLayout(childWidget);
          }
        });
      }

      window.show();
      return window;
    }
    case "vbox": {
      const layout = new QVBoxLayout();

      element.props.children?.forEach((child) => {
        const childWidget =
          child instanceof QWidget ? child : createWidget(child as JSXElement);
        if (childWidget instanceof QWidget) {
          layout.addWidget(childWidget);
        } else if (childWidget instanceof QVBoxLayout) {
          layout.addLayout(childWidget);
        }
      });
      return layout;
    }
    case "hbox": {
      const layout = new QHBoxLayout();

      element.props.children?.forEach((child) => {
        const childWidget =
          child instanceof QWidget ? child : createWidget(child as JSXElement);
        if (childWidget instanceof QWidget) {
          layout.addWidget(childWidget);
        } else if (
          childWidget instanceof QVBoxLayout ||
          childWidget instanceof QHBoxLayout
        ) {
          layout.addLayout(childWidget);
        }
      });
      return layout;
    }
    case "button": {
      const button = new QPushButton(element.props.text || "");
      if (element.props.onClick) {
        button.clicked(element.props.onClick);
      }
      return button;
    }
    case "label": {
      const label = new QLabel(element.props.text || "");
      return label;
    }
    case "input": {
      const input = new QLineEdit();
      if (element.props.onChange) {
        input.textChanged(element.props.onChange);
      }
      if (element.props.text) {
        input.setText(element.props.text);
      }
      return input;
    }
    default:
      throw new Error(`Unknown element type: ${element.type}`);
  }
}

// Export Qt components
export { QWidget, QApplication };
