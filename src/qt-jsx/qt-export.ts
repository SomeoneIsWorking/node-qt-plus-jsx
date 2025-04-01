import { createRequire } from "module";
import type { QApplication } from "./types/QApplication";
import type { QWidget } from "./types/QWidget";
import type { QLabel } from "./types/QLabel";
import type { QLineEdit } from "./types/QLineEdit";
import type { QTableView } from "./types/QTableView";
import type { QVBoxLayout } from "./types/QVBoxLayout";
import type { QHBoxLayout } from "./types/QHBoxLayout";
import type { QPushButton } from "./types/QPushButton";

const require = createRequire(import.meta.url);

const qt = require("../../build/Release/node-qt.node") as {
  QApplication: typeof QApplication;
  QWidget: typeof QWidget;
  QLabel: typeof QLabel;
  QLineEdit: typeof QLineEdit;
  QTableView: typeof QTableView;
  QVBoxLayout: typeof QVBoxLayout;
  QHBoxLayout: typeof QHBoxLayout;
  QPushButton: typeof QPushButton;
};

export { qt };
