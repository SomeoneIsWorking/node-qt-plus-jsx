# Node-Qt

A declarative Qt framework for Node.js using Bun, inspired by PyEdifice and React.

## Features

- Declarative UI components
- Signal-based state management
- TypeScript support
- Built on top of Qt
- Modern component lifecycle

## Installation

```bash
bun install node-qt
```

## Quick Start

```typescript
import { View, Button, Text } from './components';

class App extends View {
  private count: number = 0;

  render(): Component[] {
    return [
      new HStack({
        children: [
          new Text({ text: `Count: ${this.count}` }),
          new Button({
            onClick: () => {
              this.count++;
              this.setState({ count: this.count });
            }
          })
        ]
      })
    ];
  }
}
```

## Components

### View
A container component that arranges its children vertically.

### HStack
A container component that arranges its children horizontally.

### Button
A button component that emits an onClick signal when clicked.

### Text
A label component that displays text.

### TextInput
A text input component that emits an onChange signal when the text changes.

## State Management

Components can maintain state using the `setState` method:

```typescript
this.setState({ count: this.count + 1 });
```

## Signals

Signals are used for event handling and state updates:

```typescript
private onClickSignal: Signal<void>;

constructor(props: ComponentProps & { onClick?: () => void }) {
  super(props);
  this.onClickSignal = this.createSignal<void>('onClick');
  if (props.onClick) {
    this.onClickSignal.add(props.onClick);
  }
}
```

## Development

```bash
# Install dependencies
bun install

# Run the example
bun run start

# Build the project
bun run build
``` 