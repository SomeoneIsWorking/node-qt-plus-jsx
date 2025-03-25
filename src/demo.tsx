import { createRequire } from "module";
import { Signal } from "./signal";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");

// Import JSX support
import { createWidget } from "./qt-jsx";

// Counter component with signal
const Counter = () => {
  const countSignal = new Signal<number>(0);
  const labelSignal = new Signal<string>(`Counter: ${countSignal.get()}`);

  // Update label when count changes
  countSignal.connect((count) => {
    labelSignal.emit(`Counter: ${count}`);
  });

  return (
    <vbox>
      <label text={labelSignal} />
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
  const todosContainer = new qt.QWidget();
  const todosLayout = new qt.QVBoxLayout();
  todosContainer.setLayout(todosLayout);

  // Update todos display when the signal changes
  todosSignal.connect((todos) => {
    // Clear existing todos
    while(todosLayout.count() > 0) {
      const item = todosLayout.takeAt(0);
      if (item.widget()) {
        item.widget().deleteLater();
      }
    }
    // Add new todos
    todos.forEach(todo => {
      const label = new qt.QLabel(todo);
      todosLayout.addWidget(label);
    });
  });

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
      <widget>{todosContainer}</widget>
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
            <Counter />
            <TodoList />
          </vbox>
        </vbox>
      </window>
    </application>
  );
};

// Start the application
const app = createWidget(<App />);
app.exec();
