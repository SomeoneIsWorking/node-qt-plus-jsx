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
const QTableView = qt.QTableView;
const QApplication = qt.QApplication;

interface JSXElement {
  type: string | Function;
  props: {
    children?: JSXElement[];
    [key: string]: any;
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
      children: children.flat().filter(child => child != null),
    },
  };
}

function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function createWidget(element: JSXElement, parentWidget?: any): any {
  if (typeof element.type === "function") {
    const result = element.type(element.props);
    return createWidget(result as JSXElement);
  }

  switch (element.type) {
    case "application": {
      const app = new QApplication();
      if (element.props.children) {
        const children = ensureArray(element.props.children);
        const windowWidget = createWidget(children[0] as JSXElement);
        if (windowWidget && windowWidget.show) {
          windowWidget.show();
        }
      }
      app.exec();
      return app;
    }

    case "window": {
      console.log("Creating window");
      const window = new QWidget();
      if (element.props.title) {
        window.setWindowTitle(element.props.title);
      }
      if (element.props.width && element.props.height) {
        window.resize(element.props.width, element.props.height);
      }

      if (element.props.children) {
        // For window, we expect exactly one child which should be a layout
        const children = ensureArray(element.props.children);
        const layout = createWidget(children[0] as JSXElement);
        if (layout && layout.addWidget) {
          // If the child returned a layout, set it as the window's layout
          window.setLayout(layout);
        }
      }

      return window;
    }
    case "vbox": {
      console.log("Creating vbox layout");
      const layout = new QVBoxLayout();

      // Process all children
      if (element.props.children) {
        const children = ensureArray(element.props.children);
        console.log(`Processing ${children.length} vbox children`);
        children.forEach((child) => {
          console.log("Processing vbox child:", child);
          const childWidget = createWidget(child as JSXElement);
          if (childWidget) {
            if (childWidget.addLayout) {
              console.log("Adding layout to layout");
              layout.addLayout(childWidget);
            } else {
              console.log("Adding widget to layout");
              layout.addWidget(childWidget);
            }
          }
        });
      }
      
      return layout;
    }
    case "hbox": {
      const layout = new QHBoxLayout();

      if (element.props.children) {
        const children = ensureArray(element.props.children);
        children.forEach((child) => {
          const childWidget = createWidget(child as JSXElement);
          if (childWidget) {
            if (childWidget.addLayout) {
              layout.addLayout(childWidget);
            } else {
              layout.addWidget(childWidget);
            }
          }
        });
      }
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
    case "table": {
      const table = new QTableView();
      return table;
    }
    default:
      throw new Error(`Unknown element type: ${element.type}`);
  }
}

// Export everything needed for JSX
export { QWidget, QApplication };
