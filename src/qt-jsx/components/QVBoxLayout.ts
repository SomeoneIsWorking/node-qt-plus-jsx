import type { QVBoxLayout as QVBoxLayoutType } from "../types/QVBoxLayout";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";

interface VBoxLayoutProps {
    children?: any;
}

function createQVBoxLayout(props: VBoxLayoutProps): QVBoxLayoutType {
  const layout = new qt.QVBoxLayout();
  
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

export default function QVBoxLayout(props: VBoxLayoutProps): JSXElement {
  return {
    type: "vboxlayout",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQVBoxLayout(props)
    }
  };
}
