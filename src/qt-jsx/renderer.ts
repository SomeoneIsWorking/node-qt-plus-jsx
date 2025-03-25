import { JSXElement, TemplateFunction } from "./types";
import { createApplicationWidget } from "./components/application";
import { createWindowWidget } from "./components/window";
import { createVBoxWidget } from "./components/vbox";
import { createHBoxWidget } from "./components/hbox";
import { createLabelWidget } from "./components/label";
import { createButtonWidget } from "./components/button";
import { createInputWidget } from "./components/input";
import { createListWidget } from "./components/list";
import { createTableWidget } from "./components/table";

const widgetCreators: { [key: string]: (props: any) => any } = {
  application: createApplicationWidget,
  window: createWindowWidget,
  vbox: createVBoxWidget,
  hbox: createHBoxWidget,
  label: createLabelWidget,
  button: createButtonWidget,
  input: createInputWidget,
  list: createListWidget,
  table: createTableWidget,
};

export function render(element: JSXElement): any {
  if (typeof element === "string" || typeof element === "number") {
    return element;
  }

  if (element.type === "template") {
    return element;
  }

  const creator = widgetCreators[element.type as string];
  if (creator) {
    const result = creator(element.props);

    if (element.type === "application") {
      result.exec();
    }

    return result;
  }

  return element.props.widget;
}
