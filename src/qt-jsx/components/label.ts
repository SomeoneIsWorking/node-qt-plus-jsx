import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { bindIfSignal, getValue, type SignalOrValue } from "../../signal";
import type { QLabel } from "../types/QLabel";

interface LabelProps {
    text?: SignalOrValue<string | number>;
    children?: any;
}

export function createLabelWidget(props: LabelProps): QLabel {
  const text = getValue(props.text ?? "");

  const label = new qt.QLabel(String(text));
  if (props.text) {
    bindIfSignal(props.text, (text: string | number) => {
      label.setText(text?.toString() ?? "");
    });
  }

  return label;
}

export default function Label(props: LabelProps): QLabel {
  return createElement("label", props);
}
