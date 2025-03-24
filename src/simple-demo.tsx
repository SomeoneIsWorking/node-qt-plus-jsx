import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const qt = require('../build/Release/node-qt.node');

// Import JSX support
import { createElement, createWidget } from './qt-jsx';

// Simple app with just a window and label
function SimpleApp() {
    return (
        <application>
            <window title="Simple Qt TSX Demo" width={300} height={200}>
                <label text="Hello from Qt TSX!" />
            </window>
        </application>
    );
}

// Start the application
console.log('Creating application...');
const app = createWidget(<SimpleApp />);
console.log('Starting event loop...');
app.exec(); 