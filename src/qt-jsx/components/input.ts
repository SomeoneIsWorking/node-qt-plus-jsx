import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { getValue, isSignal } from "../../signal";

export function createInputWidget(props: any): any {
  const input = new qt.QLineEdit();
  
  const text = props.text !== undefined ? (isSignal(props.text) ? getValue(props.text) : props.text) : "";
  input.setText(String(text));
  
  if (isSignal(props.text)) {
    props.text.connect((newValue: any) => {
      input.setText(String(newValue));
    });
  }
  
  if (props.onChange) {
    input.textChanged(props.onChange);
  }
  
  return input;
}

export default function Input(props: any): any {
  return createElement("input", props);
} 