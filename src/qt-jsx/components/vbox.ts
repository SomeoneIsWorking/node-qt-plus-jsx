import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { render } from "../renderer";

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
