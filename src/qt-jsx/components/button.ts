import { createElement } from "../jsx";
import { qt } from "../qt-export";
import type { QPushButton } from "../types/QPushButton";

interface ButtonProps {
    text?: string;
    onClick?: () => void;
    children?: any;
}

export function createButtonWidget(props: ButtonProps): QPushButton {
  const button = new qt.QPushButton();
  
  if (props.text) {
    button.setText(props.text);
  }
  
  if (props.onClick) {
    button.clicked(props.onClick);
  }
  
  return button;
}

export default function Button(props: ButtonProps): QPushButton {
  return createElement("button", props);
} 