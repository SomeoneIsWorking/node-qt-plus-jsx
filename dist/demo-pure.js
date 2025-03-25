import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const qt = require('../build/Release/node-qt.node');
console.log('Available Qt components:', Object.keys(qt));
console.log('QLabel prototype:', Object.getPrototypeOf(qt.QLabel));
console.log('QWidget prototype:', Object.getPrototypeOf(qt.QWidget));
// Create application
const app = new qt.QApplication();
console.log('Created QApplication');
// Create main window
const window = new qt.QWidget();
console.log('Created QWidget window');
console.log('Window prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(window)));
// Try different ways to set window properties
try {
    window.setWindowTitle.call(window, "Qt Pure TypeScript Demo");
    window.resize.call(window, 400, 300);
    console.log('Set window properties');
}
catch (e) {
    console.error('Error setting window properties:', e);
}
// Create layout
const layout = new qt.QVBoxLayout();
console.log('Layout methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(layout)));
// Set layout on window
window.setLayout.call(window, layout);
console.log('Layout set on window');
// Create label
const label = new qt.QLabel("Hello from Pure Qt TypeScript!", window);
console.log('Label created');
// Try to add label to layout
try {
    layout.addWidget.call(layout, label);
    console.log('Label added to layout');
}
catch (e) {
    console.error('Error adding label to layout:', e);
}
// Show window first
window.show.call(window);
console.log('Window shown');
// Try creating label after window is shown
try {
    console.log('Attempting to create QLabel...');
    const label = new qt.QLabel("Hello from Pure Qt TypeScript!", window);
    console.log('Label created successfully');
    console.log('Label prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(label)));
    // Try different ways to make the label visible
    try {
        if (label.show) {
            label.show.call(label);
            console.log('Called show on label');
        }
        if (label.raise) {
            label.raise.call(label);
            console.log('Called raise on label');
        }
        if (label.move) {
            label.move.call(label, 10, 10);
            console.log('Called move on label');
        }
    }
    catch (e) {
        console.error('Error manipulating label:', e);
    }
}
catch (e) {
    console.error('Error creating label:', e);
}
// Start event loop
console.log('Starting event loop...');
app.exec();
