export function createElement(type: string | Function, props: any, ...children: any[]): any {
  // Ensure props is an object
  props = props || {};
  
  // Flatten and filter children, including both props.children and direct children arguments
  const allChildren = [...(props.children || []), ...children];
  const flattenedChildren = allChildren.flat().filter((child: any) => child != null);

  if (typeof type === "function") {
    return type({ ...props, children: flattenedChildren });
  }

  return {
    type,
    props: {
      ...props,
      children: flattenedChildren,
    },
  };
}
