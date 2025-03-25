import { createElement } from "../jsx";
import { qt } from "../qt-export";

export function createTableWidget(): any {
  const table = new qt.QTableView();
  return table;
}

export default function Table(props: any): any {
  return createElement("table", props);
} 