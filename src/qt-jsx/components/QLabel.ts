import type { QLabel as QLabelType } from "../types/QLabel";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { isSignal, getValue, type Signal } from "../../signal";

interface LabelProps {
  text?: string | Signal<string>;
  children?: any;
}

function createQLabel(props: LabelProps): QLabelType {
  const label = new qt.QLabel(getValue(props.text) ?? "");

  // Set up signal subscription if text is a signal
  if (isSignal(props.text)) {
    props.text.connect((newValue) => {
      label.setText(newValue);
    });
  }

  return label;
}

export default function QLabel(props: LabelProps): JSXElement {
  return {
    type: "label",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQLabel(props),
    },
  };
}
