// ReactiveList class for reactive list management
export class ReactiveList<T> {
  private items: T[] = [];
  private listeners: ((
    items: T[],
    operation: { type: "added" | "removed"; item: T; index: number }
  ) => void)[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }

  get(): T[] {
    return [...this.items];
  }

  remove(item: T) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.notify("removed", item, index);
  }

  insert(item: T) {
    this.items.push(item);
    this.notify("added", item, this.items.length - 1);
  }

  connect(
    listener: (
      items: T[],
      operation: { type: "added" | "removed"; item: T; index: number }
    ) => void
  ) {
    this.listeners.push(listener);
    return this;
  }

  private notify(type: "added" | "removed", item: T, index: number) {
    this.listeners.forEach((listener) =>
      listener(this.items, { type, item, index })
    );
  }
}

export function reactiveList<T>(initialValue: T[] = []): ReactiveList<T> {
  return new ReactiveList(initialValue);
}
