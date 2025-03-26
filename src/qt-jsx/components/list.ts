import { ReactiveList } from "../../reactive-list";
import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { render } from "../renderer";

export function createListWidget(props: any): any {
  const list = new qt.QWidget();
  const layout = new qt.QVBoxLayout();
  list.setLayout(layout);

  const itemSource = props.items;
  const items =
    itemSource instanceof ReactiveList ? itemSource.get() : itemSource;
  const template = props.children[0];
  const templateFn = template.props.children[0];

  // Store rendered items with their widgets
  const renderedItems: { item: any; widget: any; isLayout: boolean }[] = [];

  const performAdd = (item: any, index: number) => {
    const element = templateFn({ item, index });
    const widget = render(element);
    const isLayout = ["vbox", "hbox"].includes(element.type);

    renderedItems.push({ item, widget, isLayout });

    if (isLayout) {
      layout.addLayout(widget);
    } else {
      layout.addWidget(widget);
    }
  };

  const performRemove = (index: number) => {
    const { widget, isLayout } = renderedItems[index];
    renderedItems.splice(index, 1);

    if (isLayout) {
      layout.removeItem(widget);
    } else {
      layout.removeWidget(widget);
    }

    widget.deleteLater();
    layout.invalidate();
  };

  // Initial items
  items.forEach((item: any, index: number) => performAdd(item, index));

  if (itemSource instanceof ReactiveList) {
    const operations = {
      added: ({ item, index }: { item: any; index: number }) =>
        performAdd(item, index),
      removed: ({ index }: { index: number }) => performRemove(index),
    };

    itemSource.connect(
      (
        _items: any[],
        operation: { type: "added" | "removed"; item: any; index: number }
      ) => {
        operations[operation.type](operation);
      }
    );
  }

  return list;
}

export function Template(props: any): any {
  return createElement("template", props);
}

export default function List(props: any): any {
  return createElement("list", props);
}
