import { createRequire } from "module";
import React from 'react';
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");

// Qt components
const QWidget = qt.QWidget;
const QVBoxLayout = qt.QVBoxLayout;
const QHBoxLayout = qt.QHBoxLayout;
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
      const window = new QWidget();
      if (element.props.title) {
        window.setWindowTitle(element.props.title);
      }
      if (element.props.width && element.props.height) {
        window.resize(element.props.width, element.props.height);
      }

      if (element.props.children) {
        const child = element.props.children[0];
        createWidget(child as JSXElement, window);
      }

      return window;
    }

    case "vbox": {
      const layout = new QVBoxLayout();
      let container: typeof QWidget | undefined;
      
      if (parentWidget) {
        container = new QWidget(parentWidget);
        container.setLayout(layout);
      }

      if (element.props.children) {
        element.props.children.forEach((child) => {
          const childWidget = createWidget(child as JSXElement, container || parentWidget);
          if (childWidget && childWidget.addLayout) {
            layout.addLayout(childWidget);
          } else {
            layout.addWidget(childWidget);
          }
        });
      }
      
      return container || layout;
    }

    case "hbox": {
      const layout = new QHBoxLayout();
      let container: typeof QWidget | undefined;
      
      if (parentWidget) {
        container = new QWidget(parentWidget);
        container.setLayout(layout);
      }

      if (element.props.children) {
        element.props.children.forEach((child) => {
          const childWidget = createWidget(child as JSXElement, container || parentWidget);
          if (childWidget && childWidget.addLayout) {
            layout.addLayout(childWidget);
          } else {
            layout.addWidget(childWidget);
          }
        });
      }
      
      return container || layout;
    }

    case "label": {
      const label = new QLabel(element.props.text || "");
      if (parentWidget) {
        label.setParent(parentWidget);
      }
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

// Main application component
const App = () => {
  return (
    <application>
      <window title="Nested layouts">
        <vbox>
          <hbox>
            <label text="Query:" />
            <input />
          </hbox>
          <table />
        </vbox>
      </window>
    </application>
  );
};

// Create and run the application
createWidget(<App />); 