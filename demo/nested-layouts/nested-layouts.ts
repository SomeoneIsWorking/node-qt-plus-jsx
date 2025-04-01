import { qt } from "../../src/qt-jsx/qt-export";

// Create application and store in global scope
const app = new qt.QApplication();
(global as any).app = app;

// Create main window and store in global scope
const qwindow = new qt.QWidget();

// Create widgets and store in global scope
const queryLabel = new qt.QLabel("Query:");
const queryEdit = new qt.QLineEdit();
const resultView = new qt.QTableView();
(global as any).widgets = {
    queryLabel,
    queryEdit,
    resultView
};

// Create layouts and store in global scope
const queryLayout = new qt.QHBoxLayout();
queryLayout.addWidget(queryLabel);
queryLayout.addWidget(queryEdit);

const mainLayout = new qt.QVBoxLayout();
mainLayout.addLayout(queryLayout);
mainLayout.addWidget(resultView);
(global as any).layouts = {
    queryLayout,
    mainLayout
};

// Set layout for window
qwindow.setLayout(mainLayout);

// Set window title and show
qwindow.setWindowTitle("Nested layouts");
qwindow.show();

// Start event loop
app.exec(); 