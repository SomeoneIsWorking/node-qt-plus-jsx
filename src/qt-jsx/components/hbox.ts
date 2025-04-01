import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { render } from "../renderer";

export function createHBoxWidget(props: any): any {
  const layout = new qt.QHBoxLayout();

  if (props.children) {
    props.children.forEach((child: any) => {
      const childWidget = render(child);
      if (["hbox", "hbox"].includes(child.type)) {
        layout.addLayout(childWidget);
      } else {
        layout.addWidget(childWidget);
      }
    });
  }

  return layout;
}

export default function HBox(props: any): any {
  return createElement("hbox", props);
}
