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

export function createWidget(element: JSXElement, parentWidget?: QWidget): any {
  if (typeof element.type === "function") {
    const result = element.type(element.props);
    return createWidget(result);
  }

  switch (element.type) {
    case "application": {
      const app = new QApplication();
      if (element.props.children) {
        const windowWidget = createWidget(element.props.children[0]);
        if (windowWidget && windowWidget.show) {
          windowWidget.show();
        }
      }
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
        const child = element.props.children[0];
        createWidget(child as JSXElement, window);
      }

      return window;
    }
    case "vbox": {
      console.log("Creating vbox layout");
      const layout = new QVBoxLayout();
      let container: typeof QWidget | undefined;
      
      // If we have a parent widget, create a container for nested layout
      if (parentWidget) {
        container = new QWidget(parentWidget);
        container.setLayout(layout);
      }

      // Process all children
      if (element.props.children) {
        console.log(`Processing ${element.props.children.length} vbox children`);
        element.props.children.forEach((child) => {
          console.log("Processing vbox child:", child);
          // Use container as parent if we have one, otherwise use parentWidget
          const childWidget = createWidget(child as JSXElement, container || parentWidget);
          // Check if it's a layout by presence of addLayout method
          if (childWidget && childWidget.addLayout) {
            console.log("Adding layout to layout");
            layout.addLayout(childWidget);
          } else {
            console.log("Adding widget to layout");
            layout.addWidget(childWidget);
          }
        });
      }
      
      return container || layout;
    }
    case "hbox": {
      const layout = new QHBoxLayout();

      element.props.children?.forEach((child) => {
        const childWidget = createWidget(child as JSXElement);
        // Check if it's a layout by presence of addLayout method
        if (childWidget && childWidget.addLayout) {
          layout.addLayout(childWidget);
        } else {
          layout.addWidget(childWidget);
        }
      });
      return layout;
    }
    case "button": {
      const button = new QPushButton(element.props.text || "");
      if (element.props.onClick) {
        button.clicked(element.props.onClick);
      }
      if (parentWidget) {
        button.setParent(parentWidget);
      }
      return button;
    }
    case "label": {
      const label = new QLabel(element.props.text || "", parentWidget);
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
      if (parentWidget) {
        input.setParent(parentWidget);
      }
      return input;
    }
    case "table": {
      const table = new QTableView();
      if (parentWidget) {
        table.setParent(parentWidget);
      }
      return table;
    }
    default:
      throw new Error(`Unknown element type: ${element.type}`);
  }
}

// Export Qt components
export { QWidget, QApplication };
