export interface SelectorOptions {
  tag: string;
  className: string;
  id: string;
  attrName: string;
  attrValue: string;
}

export function buildXPath(options: SelectorOptions): string {
  const { tag, className, id, attrName, attrValue } = options;
  const t = tag || "*";
  let xpath = `//${t}`;

  if (id) {
    xpath += `[@id="${id}"]`;
  }

  if (className) {
    const classes = className.trim().split(/\s+/);
    for (const cls of classes) {
      xpath += `[contains(concat(@class," "),"${cls} ")]`;
    }
  }

  if (attrName) {
    if (attrValue) {
      xpath += `[@${attrName}="${attrValue}"]`;
    } else {
      xpath += `[@${attrName}]`;
    }
  }

  return xpath;
}

export function buildCSSSelector(options: SelectorOptions): string {
  const { tag, className, id, attrName, attrValue } = options;
  let selector = tag || "*";

  if (id) {
    selector += `#${id}`;
  }

  if (className) {
    const classes = className.trim().split(/\s+/);
    for (const cls of classes) {
      if (cls) {
        selector += `.${cls}`;
      }
    }
  }

  if (attrName) {
    if (attrValue) {
      selector += `[${attrName}="${attrValue}"]`;
    } else {
      selector += `[${attrName}]`;
    }
  }

  return selector;
}
