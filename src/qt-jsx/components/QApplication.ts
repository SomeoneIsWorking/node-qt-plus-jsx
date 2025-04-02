import type { QApplication as QApplicationType } from "../types/QApplication";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";

interface ApplicationProps {
    children?: any;
}

function createQApplication(props: ApplicationProps): QApplicationType {
  const app = new qt.QApplication();
  if (props.children) {
    props.children.forEach((child: any) => {
      render(child);
    });
  }
  return app;
}

export default function QApplication(props: ApplicationProps): JSXElement {
  return {
    type: "application",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQApplication(props)
    }
  };
}
