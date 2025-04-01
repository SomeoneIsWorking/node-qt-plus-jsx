import { createSignal } from "../src/signal";
import { createElement } from "../src/qt-jsx/jsx";
import Application from "../src/qt-jsx/components/application";
import Window from "../src/qt-jsx/components/window";
import VBox from "../src/qt-jsx/components/vbox";
import HBox from "../src/qt-jsx/components/hbox";
import Button from "../src/qt-jsx/components/button";
import Input from "../src/qt-jsx/components/input";
import Label from "../src/qt-jsx/components/label";
import List, { Template } from "../src/qt-jsx/components/list";
import Table from "../src/qt-jsx/components/table";
import { render } from "../src/qt-jsx/renderer";
import { reactiveList } from "../src/reactive-list";

// Create some signals for state management
const counter = createSignal(0);
const inputText = createSignal("");
const items = reactiveList([
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
  { id: 3, name: "Item 3" },
]);

// Create a template function for the list
function ItemTemplate({ item, index }: { item: any; index: number }) {
  return (
    <HBox>
      <Label text={`${index + 1}. ${item.name}`} />
      <Button
        text="Delete"
        onClick={() => {
          items.remove(item);
        }}
      />
    </HBox>
  );
}

// Main app
function App() {
  return (
    <Application>
      <Window title="Qt JSX Demo" width={800} height={600}>
        <VBox>
          <HBox>
            <Label text="Counter: " />
            <Label text={counter} />
            <Button
              text="Increment"
              onClick={() => counter.set(counter.get() + 1)}
            />
          </HBox>

          <HBox>
            <Label text="Input: " />
            <Input
              text={inputText}
              onChange={(text: string) => inputText.set(text)}
            />
            <Label text={inputText} />
          </HBox>

          <Label text="List of Items:" />
          <List items={items}>
            <Template>{ItemTemplate}</Template>
          </List>

          <Label text="Table:" />
          <Table />
        </VBox>
      </Window>
    </Application>
  );
}

// Render the app
render(<App />);
