import type { QWidget } from "../types/QWidget";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";

interface MainWindowProps {
    title?: string;
    width?: number;
    height?: number;
    children?: any;
}

function createQMainWindow(props: MainWindowProps): QWidget {
  const window = new qt.QWidget();

  if (props.title) {
    window.setWindowTitle(props.title);
  }

  if (props.width && props.height) {
    window.resize(props.width, props.height);
  }

  if (props.children) {
    props.children.forEach((child: any) => {
      const childWidget = render(child);
      if (child.type === "vboxlayout" || child.type === "hboxlayout") {
        window.setLayout(childWidget);
      }
    });
  }

  window.show();
  return window;
}

export default function QMainWindow(props: MainWindowProps): JSXElement {
  return {
    type: "mainwindow",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQMainWindow(props)
    }
  };
}
