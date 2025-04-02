import { JSXElement } from "./types";
import { QObject } from "./types/base";
import type { QApplication } from "./types/QApplication";
import type { QWidget } from "./types/QWidget";

let app: QApplication | null = null;

export function render(element: JSXElement): any {
  if (!element) return null;

  if (element.props.createWidget) {
    const widget = element.props.createWidget();

    if (element.type === "application") {
      app = widget as QApplication;
      app.exec();
    }

    // Only show if it's a QWidget (not a layout or other type)
    if (widget && element.type === "widget") {
      (widget as QWidget).show();
    }

    return widget;
  }

  return null;
}
