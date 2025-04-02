import type { QPushButton as QPushButtonType } from "../types/QPushButton";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    children?: any;
}

function createQPushButton(props: ButtonProps): QPushButtonType {
  const button = new qt.QPushButton(props.text);
  
  if (props.onClick) {
    button.clicked(props.onClick);
  }

  return button;
}

export default function QPushButton(props: ButtonProps): JSXElement {
  return {
    type: "pushbutton",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQPushButton(props)
    }
  };
} 