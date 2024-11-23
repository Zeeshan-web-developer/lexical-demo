import { TextNode } from 'lexical';

export class FontSizeNode extends TextNode {
  static getType() {
    return 'font-size';
  }

  static clone(node) {
    return new FontSizeNode(node.__text, node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    this.applyFontSize(dom);
    return dom;
  }

  updateDOM(prevNode, dom) {
    const isUpdated = super.updateDOM(prevNode, dom);
    if (this.getFontSize() !== prevNode.getFontSize()) {
      this.applyFontSize(dom);
    }
    return isUpdated;
  }

  setFontSize(fontSize) {
    if (typeof fontSize !== 'string' || !fontSize.match(/^\d+(px|em|rem|%)$/)) {
      throw new Error('Invalid font size');
    }
    const writable = this.getWritable();
    writable.__fontSize = fontSize;
  }

  getFontSize() {
    return this.__fontSize || null; // Return null to inherit parent styles
  }

  applyFontSize(dom) {
    dom.style.fontSize = this.getFontSize();
  }
}

export function $createFontSizeNode(text, fontSize) {
  const node = new FontSizeNode(text);
  node.setFontSize(fontSize);
  return node;
}

export function $isFontSizeNode(node) {
  return node instanceof FontSizeNode;
}
