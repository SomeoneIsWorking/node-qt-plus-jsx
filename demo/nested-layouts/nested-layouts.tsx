/** @jsx createElement */
import { createElement } from "../../src/qt-jsx/jsx";
import { render } from "../../src/qt-jsx/renderer";
// Main application component
const App = () => {
  return (
    <application>
      <window title="Nested layouts">
        <vbox>
          <hbox>
            <label text="Query:" />
            <input />
          </hbox>
          <table />
        </vbox>
      </window>
    </application>
  );
};

// Create and run the application
render(<App />);
