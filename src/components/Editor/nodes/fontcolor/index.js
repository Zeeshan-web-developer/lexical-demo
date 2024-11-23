// FontColor.js
import { TextNode } from 'lexical';

export class FontColorNode extends TextNode {
  static getType() {
    return 'font-color';
  }

  static clone(node) {
    return new FontColorNode(node.__text, node.__key);
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    this.applyFontColor(dom);
    return dom;
  }

  updateDOM(prevNode, dom) {
    const isUpdated = super.updateDOM(prevNode, dom);
    if (this.getFontColor() !== prevNode.getFontColor()) {
      this.applyFontColor(dom);
    }
    return isUpdated;
  }

  setFontColor(color) {
    const writable = this.getWritable();
    writable.__fontColor = color;
  }

  getFontColor() {
    return this.__fontColor || 'inherit'; // Default font color
  }

  applyFontColor(dom) {
    dom.style.color = this.getFontColor();
  }
}

export function $createFontColorNode(text, color) {
  const node = new FontColorNode(text);
  node.setFontColor(color);
  return node;
}

export function $isFontColorNode(node) {
  return node instanceof FontColorNode;
}
