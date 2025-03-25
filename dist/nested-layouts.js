import { createRequire } from "module";
const require = createRequire(import.meta.url);
const qt = require("../build/Release/node-qt.node");
// Create application
const app = new qt.QApplication();
// Create main window
const window = new qt.QWidget();
window.setWindowTitle("Nested layouts");
// Create widgets
const queryLabel = new qt.QLabel("Query:");
const queryEdit = new qt.QLineEdit();
const resultView = new qt.QTableView();
// Create layouts
const queryLayout = new qt.QHBoxLayout();
queryLayout.addWidget(queryLabel);
queryLayout.addWidget(queryEdit);
const mainLayout = new qt.QVBoxLayout();
mainLayout.addLayout(queryLayout);
mainLayout.addWidget(resultView);
// Set the main layout
window.setLayout(mainLayout);
// Show window and run application
window.show();
app.exec();
