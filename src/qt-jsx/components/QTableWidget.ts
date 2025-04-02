import type { QTableView } from "../types/QTableView";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";

interface TableWidgetProps {
    columns?: string[];
    rows?: string[][];
    onCellSelected?: (row: number, column: number) => void;
    children?: any;
}

function createQTableWidget(props: TableWidgetProps): QTableView {
  const table = new qt.QTableView();
  
  if (props.columns) {
    // TODO: Implement column headers
  }
  
  if (props.rows) {
    // TODO: Implement row data
  }
  
  if (props.onCellSelected) {
    // TODO: Implement cell selection
  }

  return table;
}

export default function QTableWidget(props: TableWidgetProps): JSXElement {
  return {
    type: "table",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQTableWidget(props)
    }
  };
} 