import { createElement } from "../jsx";
import { qt } from "../qt-export";

export function createButtonWidget(props: any): any {
  const button = new qt.QPushButton();
  
  if (props.text) {
    button.setText(props.text);
  }
  
  if (props.onClick) {
    button.clicked(props.onClick);
  }
  
  return button;
}

export default function Button(props: any): any {
  return createElement("button", props);
} 