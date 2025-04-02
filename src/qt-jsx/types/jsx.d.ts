import type { QObject } from "./base";

export interface JSXElement {
  type: string;
  props: {
    children?: any[];
    createWidget?: () => QObject;
    [key: string]: any;
  };
} 