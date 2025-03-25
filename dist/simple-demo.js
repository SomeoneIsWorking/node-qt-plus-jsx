import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const qt = require('../build/Release/node-qt.node');
// Import JSX support
import { createElement, createWidget } from './qt-jsx';
// Simple app with just a window and label
function SimpleApp() {
    return (createElement("application", null,
        createElement("window", { title: "Simple Qt TSX Demo", width: 300, height: 200 },
            createElement("label", { text: "Hello from Qt TSX!" }))));
}
// Start the application
console.log('Creating application...');
const app = createWidget(createElement(SimpleApp, null));
console.log('Starting event loop...');
app.exec();
