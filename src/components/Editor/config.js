import lexicalEditorTheme from "../../theme/lexicalEditorTheme";

import { AutoLinkNode, LinkNode } from "@lexical/link";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { TableNode, TableCellNode, TableRowNode } from "@lexical/table";
import { ListNode, ListItemNode } from "@lexical/list";
import { ImageNode } from "./nodes/ImageNode";
import { FontSizeNode } from './nodes/fontSizeNode/FontSize';
import { FontColorNode } from "./nodes/fontcolor/index";



// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

const lexicalEditorConfig = {
  namespace: "MyEditor",
  theme: lexicalEditorTheme,
  onError,
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
    ImageNode,
    FontSizeNode,
    FontColorNode,
    
   
  ],
};

export default lexicalEditorConfig;
