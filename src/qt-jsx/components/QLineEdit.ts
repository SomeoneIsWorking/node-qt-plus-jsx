import type { QLineEdit as QLineEditType } from "../types/QLineEdit";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";

interface LineEditProps {
    text?: string;
    onChange?: (text: string) => void;
    children?: any;
}

function createQLineEdit(props: LineEditProps): QLineEditType {
  const input = new qt.QLineEdit();
  
  if (props.text) {
    input.setText(props.text);
  }
  
  if (props.onChange) {
    input.textChanged(props.onChange);
  }

  return input;
}

export default function QLineEdit(props: LineEditProps): JSXElement {
  return {
    type: "lineedit",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQLineEdit(props)
    }
  };
} 