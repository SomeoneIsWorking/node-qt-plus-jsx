import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const qt = require('./build/Release/node-qt.node');

// Create a new application
const app = new qt.QApplication();

// Create a window
const window = new qt.QWidget();
window.setWindowTitle("Hello from Qt!");
window.resize(300, 200);

// Create a vertical layout
const layout = new qt.QVBoxLayout();
window.setLayout(layout);

// Create a label
const label = new qt.QLabel("Hello, World!");
layout.addWidget(label);

// Create a button
const button = new qt.QPushButton("Click me!");
layout.addWidget(button);

// Create a text input
const input = new qt.QLineEdit();
layout.addWidget(input);

// Show the window
window.show();

// Start the event loop
app.exec(); 