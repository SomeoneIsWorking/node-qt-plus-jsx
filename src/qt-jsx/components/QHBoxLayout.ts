import type { QHBoxLayout as QHBoxLayoutType } from "../types/QHBoxLayout";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";

interface HBoxLayoutProps {
    children?: any;
}

function createQHBoxLayout(props: HBoxLayoutProps): QHBoxLayoutType {
  const layout = new qt.QHBoxLayout();
  
  if (props.children) {
    props.children.forEach((child: any) => {
      const childWidget = render(child);
      if (child.type === "vboxlayout" || child.type === "hboxlayout") {
        layout.addLayout(childWidget);
      } else {
        layout.addWidget(childWidget);
      }
    });
  }

  return layout;
}

export default function QHBoxLayout(props: HBoxLayoutProps): JSXElement {
  return {
    type: "hboxlayout",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQHBoxLayout(props)
    }
  };
}
