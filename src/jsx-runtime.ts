import type { JSXElement } from './types/jsx.js';

export function jsx(type: string | Function, props: any): JSXElement {
  const { children, ...rest } = props;
  return {
    type,
    props: {
      ...rest,
      children: children ? (Array.isArray(children) ? children : [children]) : [],
    },
  };
}

export const jsxs = jsx;
export const Fragment = Symbol('Fragment'); 