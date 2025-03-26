# node-qt-jsx

A Node.js binding for Qt with JSX support, allowing you to create native desktop applications using Node.js and Qt.

## About

This project was created through vibe coding so if you have bias against that, I would recommend you stop here.

## Features

- Native Qt bindings for Node.js
- JSX support for declarative UI creation
- Reactive list components
- Support for common Qt widgets (QWidget, QLabel, QLineEdit, QPushButton, etc.)
- Layout management (QVBoxLayout, QHBoxLayout)

## Prerequisites

- Node.js (v14 or higher)
- Qt development libraries
- node-gyp (for building native modules)

## Installation

```bash
npm install node-qt-jsx
```

## Quick Start

```typescript
import { QApplication, QWidget, QVBoxLayout, QLabel, QPushButton } from 'node-qt-jsx';

const app = new QApplication();
const window = new QWidget();
const layout = new QVBoxLayout();

const label = new QLabel("Hello, Qt!");
const button = new QPushButton("Click me!");

layout.addWidget(label);
layout.addWidget(button);
window.setLayout(layout);
window.show();

app.exec();
```

## JSX Example

```typescript
import { QApplication, QWidget, QVBoxLayout, QLabel, QPushButton } from 'node-qt-jsx';

function App() {
  return (
    <QWidget>
      <QVBoxLayout>
        <QLabel>Hello, Qt!</QLabel>
        <QPushButton>Click me!</QPushButton>
      </QVBoxLayout>
    </QWidget>
  );
}

const app = new QApplication();
const window = render(<App />);
window.show();
app.exec();
```

## Building from Source

```bash
git clone https://github.com/yourusername/node-qt-jsx.git
cd node-qt-jsx
npm install
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details. 