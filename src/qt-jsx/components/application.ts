import { createElement } from "../jsx";
import { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";


export function createApplicationWidget(props: any): any {
  const app = new qt.QApplication();
  if (props.children) {
    props.children.forEach((child: any) => {
      render(child);
    });
  }
  return app;
}

export default function Application(props: any): JSXElement {
  return createElement("application", props);
}
