import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");
// Import JSX support
import { createElement, createWidget } from "./qt-jsx";
// Signal implementation
class Signal {
    constructor(initialValue) {
        this.listeners = [];
        this.value = initialValue;
    }
    get() {
        return this.value;
    }
    emit(newValue) {
        this.value = newValue;
        this.listeners.forEach((listener) => listener(newValue));
    }
    connect(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
// Counter component with signal
const Counter = () => {
    const countSignal = new Signal(0);
    return (createElement("vbox", null,
        createElement("label", { text: `Counter: ${countSignal.get()}` }),
        createElement("button", { text: "Increment", onClick: () => {
                const newCount = countSignal.get() + 1;
                countSignal.emit(newCount);
            } })));
};
// Todo list component with signals
const TodoList = () => {
    const todosSignal = new Signal([]);
    const inputSignal = new Signal("");
    return (createElement("vbox", null,
        createElement("label", { text: "Todo List" }),
        createElement("input", { onChange: (text) => {
                inputSignal.emit(text);
            } }),
        createElement("button", { text: "Add Todo", onClick: () => {
                const text = inputSignal.get();
                if (text.trim()) {
                    todosSignal.emit([...todosSignal.get(), text.trim()]);
                    inputSignal.emit("");
                }
            } }),
        createElement("vbox", null, todosSignal.get().map((todo) => (createElement("label", { text: todo }))))));
};
// Main application
const App = () => {
    return (createElement("application", null,
        createElement("window", { title: "Qt TSX Demo", width: 400, height: 300 },
            createElement("vbox", null,
                createElement("label", { text: "Qt TSX Demo1" }),
                createElement("label", { text: "Qt TSX Demo2" }),
                createElement("vbox", null,
                    createElement("label", { text: "Qt TSX Demo3" }),
                    createElement("label", { text: "Qt TSX Demo4" }))))));
};
// Start the application
const app = createWidget(createElement(App, null));
app.exec();
