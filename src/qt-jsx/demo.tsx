import { createSignal } from "../signal";
import { createElement } from "./jsx";
import Application from "./components/application";
import Window from "./components/window";
import VBox from "./components/vbox";
import HBox from "./components/hbox";
import Button from "./components/button";
import Input from "./components/input";
import Label from "./components/label";
import List, { Template } from "./components/list";
import Table from "./components/table";
import { render } from "./renderer";
import { reactiveList } from "../reactive-list";

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
            <Template>
              {ItemTemplate}
            </Template>
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
