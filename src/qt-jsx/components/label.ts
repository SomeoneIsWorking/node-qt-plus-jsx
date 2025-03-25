import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { bindIfSignal, getValue } from "../../signal";

export function createLabelWidget(props: any): any {
  const text = getValue(props.text);

  const label = new qt.QLabel(String(text));
  bindIfSignal(props.text, (text: any) => {
    label.setText(text);
  });

  return label;
}

export default function Label(props: any): any {
  return createElement("label", props);
}
