import type { QWidget } from "../types/QWidget";
import type { JSXElement } from "../types";
import { qt } from "../qt-export";
import { render } from "../renderer";
import { ReactiveList } from "../../reactive-list";

interface ListWidgetProps<T = any> {
    items?: string[] | ReactiveList<T>;
    template?: (props: { item: T; index: number }) => JSXElement;
    onItemSelected?: (index: number) => void;
    children?: any;
}

function createQListWidget<T>(props: ListWidgetProps<T>): QWidget {
  const list = new qt.QWidget();
  const layout = new qt.QVBoxLayout();
  list.setLayout(layout);

  const itemSource = props.items;
  const items = itemSource instanceof ReactiveList ? itemSource.get() : itemSource;
  const template = props.template || ((props: { item: T; index: number }) => ({
    type: "label",
    props: { text: String(props.item) }
  }));

  // Store rendered items with their widgets
  const renderedItems: { item: any; widget: any; isLayout: boolean }[] = [];

  const performAdd = (item: any, index: number) => {
    const element = template({ item, index });
    const widget = render(element);
    if (!widget) return; // Skip if widget creation failed

    const isLayout = ["vboxlayout", "hboxlayout"].includes(element.type as string);
    renderedItems.push({ item, widget, isLayout });

    if (isLayout) {
      layout.addLayout(widget);
    } else {
      layout.addWidget(widget);
    }
  };

  const performRemove = (index: number) => {
    const { widget, isLayout } = renderedItems[index];
    if (!widget) return; // Skip if widget is null

    renderedItems.splice(index, 1);

    if (isLayout) {
      layout.removeItem(widget);
    } else {
      layout.removeWidget(widget);
    }

    widget.deleteLater();
  };

  // Initial items
  items?.forEach((item: any, index: number) => performAdd(item, index));

  if (itemSource instanceof ReactiveList) {
    const operations = {
      added: ({ item, index }: { item: any; index: number }) => performAdd(item, index),
      removed: ({ index }: { index: number }) => performRemove(index)
    };

    itemSource.connect(
      (_items: any[], operation: { type: "added" | "removed"; item: any; index: number }) => {
        operations[operation.type](operation);
      }
    );
  }

  return list;
}

export default function QListWidget<T>(props: ListWidgetProps<T>): JSXElement {
  return {
    type: "widget",
    props: {
      ...props,
      children: props.children || [],
      createWidget: () => createQListWidget(props)
    }
  };
}
