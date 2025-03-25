import { Signal } from "../signal.js";

export type TemplateFunction = (props: any) => JSXElement;

export interface JSXElement {
  type: string | Function;
  props: {
    children?: (JSXElement | TemplateFunction)[];
    [key: string]: any;
  };
}

export function ensureArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export function isSignal<T>(value: T | Signal<T>): value is Signal<T> {
  return value instanceof Signal;
} 