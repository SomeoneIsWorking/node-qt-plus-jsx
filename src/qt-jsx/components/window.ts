import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { render } from "../renderer";

export function createWindowWidget(props: any): any {
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
      if (["vbox", "hbox"].includes(child.type)) {
        window.setLayout(childWidget);
      }
    });
  }

  window.show();
  return window;
}

export default function Window(props: any): any {
  return createElement("window", props);
}
