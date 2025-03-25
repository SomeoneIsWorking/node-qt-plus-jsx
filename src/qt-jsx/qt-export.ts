import { createRequire } from "module";

const require = createRequire(import.meta.url);

const qt = require("../../build/Release/node-qt.node");

export { qt };