import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { createLabelWidget } from "./label";
import { createButtonWidget } from "./button";
import { createInputWidget } from "./input";
import { createListWidget } from "./list";
import { createTableWidget } from "./table";
import { createHBoxWidget } from "./hbox";
import { render } from "../renderer";

const widgetCreators: { [key: string]: (props: any) => any } = {
  label: createLabelWidget,
  button: createButtonWidget,
  input: createInputWidget,
  list: createListWidget,
  table: createTableWidget,
  hbox: createHBoxWidget,
};

export function createVBoxWidget(props: any): any {
  const layout = new qt.QVBoxLayout();

  if (props.children) {
    props.children.forEach((child: any) => {
      const childWidget = render(child);
      if (["vbox", "hbox"].includes(child.type)) {
        layout.addLayout(childWidget);
      } else {
        layout.addWidget(childWidget);
      }
    });
  }

  return layout;
}

export default function VBox(props: any): any {
  return createElement("vbox", props);
}
