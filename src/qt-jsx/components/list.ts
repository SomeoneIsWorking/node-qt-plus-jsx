import { ReactiveList } from "../../reactive-list";
import { createElement } from "../jsx";
import { qt } from "../qt-export";
import { render } from "../renderer";

export function createListWidget(props: any): any {
  const list = new qt.QWidget();
  const layout = new qt.QVBoxLayout();
  list.setLayout(layout);

  if (props.items && props.children) {
    const itemSource = props.items;
    const items = itemSource instanceof ReactiveList ? itemSource.get() : itemSource;
    const template = props.children[0];
    const templateFn = template.props.children[0];

    // Store rendered items with their widgets
    const renderedItems: { item: any, widget: any, isLayout: boolean }[] = [];

    items.forEach((item: any, index: number) => {
      const element = templateFn({ item, index });
      const widget = render(element);
      const isLayout = ["vbox", "hbox"].includes(element.type);
      
      renderedItems.push({ item, widget, isLayout });
      
      if (isLayout) {
        layout.addLayout(widget);
      } else {
        layout.addWidget(widget);
      }
    });

    if (itemSource instanceof ReactiveList) {
      itemSource.connect((items: any[], operation: { type: 'added' | 'removed', item: any, index: number }) => {
        if (operation.type === 'added') {
          const element = templateFn({ item: operation.item, index: operation.index });
          const widget = render(element);
          const isLayout = ["vbox", "hbox"].includes(element.type);
          
          renderedItems.push({ item: operation.item, widget, isLayout });
          
          if (isLayout) {
            layout.addLayout(widget);
          } else {
            layout.addWidget(widget);
          }
        } else if (operation.type === 'removed') {
          const itemIndex = renderedItems.findIndex(i => i.item === operation.item);
          if (itemIndex !== -1) {
            const { widget, isLayout } = renderedItems[itemIndex];
            renderedItems.splice(itemIndex, 1);
            
            if (isLayout) {
              layout.removeLayout(widget);
            } else {
              layout.removeWidget(widget);
            }
            widget.deleteLater();
          }
        }
      });
    }
  }

  return list;
}

export function Template(props: any): any {
  return createElement("template", props);
}

export default function List(props: any): any {
  return createElement("list", props);
}
