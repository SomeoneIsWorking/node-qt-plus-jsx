import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");

// Qt components
const QApplication = qt.QApplication;
const QWidget = qt.QWidget;
const QLabel = qt.QLabel;
const QLineEdit = qt.QLineEdit;
const QTableView = qt.QTableView;
const QHBoxLayout = qt.QHBoxLayout;
const QVBoxLayout = qt.QVBoxLayout;

// Create application and store in global scope
const app = new QApplication();
(global as any).app = app;

// Create main window and store in global scope
const window = new QWidget();
(global as any).window = window;

// Create widgets and store in global scope
const queryLabel = new QLabel("Query:");
const queryEdit = new QLineEdit();
const resultView = new QTableView();
(global as any).widgets = {
    queryLabel,
    queryEdit,
    resultView
};

// Create layouts and store in global scope
const queryLayout = new QHBoxLayout();
queryLayout.addWidget(queryLabel);
queryLayout.addWidget(queryEdit);

const mainLayout = new QVBoxLayout();
mainLayout.addLayout(queryLayout);
mainLayout.addWidget(resultView);
(global as any).layouts = {
    queryLayout,
    mainLayout
};

// Set layout for window
window.setLayout(mainLayout);

// Set window title and show
window.setWindowTitle("Nested layouts");
window.show();

// Start event loop
app.exec(); 