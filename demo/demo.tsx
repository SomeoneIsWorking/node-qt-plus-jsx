import { computed, createSignal, getValue } from "../src/signal";
import { createElement } from "../src/qt-jsx/jsx";
import QApplication from "../src/qt-jsx/components/QApplication";
import QMainWindow from "../src/qt-jsx/components/QMainWindow";
import QVBoxLayout from "../src/qt-jsx/components/QVBoxLayout";
import QHBoxLayout from "../src/qt-jsx/components/QHBoxLayout";
import QPushButton from "../src/qt-jsx/components/QPushButton";
import QLineEdit from "../src/qt-jsx/components/QLineEdit";
import QLabel from "../src/qt-jsx/components/QLabel";
import QListWidget from "../src/qt-jsx/components/QListWidget";
import QTableWidget from "../src/qt-jsx/components/QTableWidget";
import { render } from "../src/qt-jsx/renderer";
import { reactiveList } from "../src/reactive-list";
import { randomUUID } from "crypto";

// Create some signals for state management
const counter = createSignal(0);
const inputText = createSignal("");
const items = reactiveList([
  { id: "1", name: "Item 1" },
  { id: "2", name: "Item 2" },
  { id: "3", name: "Item 3" },
]);

// Create a template function for the list
function ItemTemplate({ item, index }: { item: any; index: number }) {
  return (
    <QHBoxLayout>
      <QLabel text={`${index + 1}. ${item.name}`} />
      <QPushButton
        text="Delete"
        onClick={() => {
          items.remove(item);
        }}
      />
    </QHBoxLayout>
  );
}

// Main app
function App() {
  return (
    <QApplication>
      <QMainWindow title="Qt JSX Demo" width={800} height={600}>
        <QVBoxLayout>
          <QHBoxLayout>
            <QLabel text={computed(() => "Counter: " + counter.get())} />
            <QPushButton
              text="Increment"
              onClick={() => counter.set(counter.get() + 1)}
            />
          </QHBoxLayout>

          <QHBoxLayout>
            <QLabel text="Input: " />
            <QLineEdit
              text={getValue(inputText)}
              onChange={(text: string) => inputText.set(text)}
            />
          </QHBoxLayout>

          <QLabel text="List of Items:" />
          <QListWidget items={items}>{ItemTemplate}</QListWidget>
          <QPushButton
            text="Add Item"
            onClick={() =>
              items.insert({
                id: randomUUID().toString(),
                name: inputText.get(),
              })
            }
          />
          <QLabel text="Table:" />
          <QTableWidget />
        </QVBoxLayout>
      </QMainWindow>
    </QApplication>
  );
}

// Render the app
render(<App />);
