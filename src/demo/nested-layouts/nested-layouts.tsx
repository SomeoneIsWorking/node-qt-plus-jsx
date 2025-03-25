/** @jsx createElement */
import { createWidget, createElement } from '../../qt-jsx.js';

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
createWidget(<App />); 