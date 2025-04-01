import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { bindIfSignal, getValue, type SignalOrValue } from "../../signal";
import type { QLineEdit } from "../types/QLineEdit";

interface InputProps {
    value?: SignalOrValue<string>;
    onChange?: (value: string) => void;
    children?: any;
}

export function createInputWidget(props: InputProps): QLineEdit {
  const value = getValue(props.value ?? "");

  const input = new qt.QLineEdit();
  input.setText(value);

  if (props.onChange) {
    input.textChanged(props.onChange);
  }

  if (props.value) {
    bindIfSignal(props.value, (value: string) => {
      input.setText(value);
    });
  }

  return input;
}

export default function Input(props: InputProps): QLineEdit {
  return createElement("input", props);
} 