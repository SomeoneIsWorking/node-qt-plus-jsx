import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");

// Import JSX support
import { createElement, createWidget, JSXElement } from "./qt-jsx";

// Signal implementation
class Signal<T> {
  private value: T;
  private listeners: ((value: T) => void)[] = [];

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get(): T {
    return this.value;
  }

  emit(newValue: T) {
    this.value = newValue;
    this.listeners.forEach((listener) => listener(newValue));
  }

  connect(listener: (value: T) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

// Counter component with signal
const Counter = () => {
  const countSignal = new Signal<number>(0);

  return (
    <vbox>
      <label text={`Counter: ${countSignal.get()}`} />
      <button
        text="Increment"
        onClick={() => {
          const newCount = countSignal.get() + 1;
          countSignal.emit(newCount);
        }}
      />
    </vbox>
  );
};

// Todo list component with signals
const TodoList = () => {
  const todosSignal = new Signal<string[]>([]);
  const inputSignal = new Signal<string>("");

  return (
    <vbox>
      <label text="Todo List" />
      <input
        onChange={(text: string) => {
          inputSignal.emit(text);
        }}
      />
      <button
        text="Add Todo"
        onClick={() => {
          const text = inputSignal.get();
          if (text.trim()) {
            todosSignal.emit([...todosSignal.get(), text.trim()]);
            inputSignal.emit("");
          }
        }}
      />
      <vbox>
        {todosSignal.get().map((todo: string) => (
          <label text={todo} />
        ))}
      </vbox>
    </vbox>
  );
};

// Main application
const App = () => {
  return (
    <application>
      <window title="Qt TSX Demo" width={400} height={300}>
        <vbox>
          <label text="Qt TSX Demo1" />
          <label text="Qt TSX Demo2" />
          <vbox>
            <label text="Qt TSX Demo3" />
            <label text="Qt TSX Demo4" />
          </vbox>
        </vbox>
      </window>
    </application>
  );
};

// Start the application
const app = createWidget(<App />);
app.exec();
