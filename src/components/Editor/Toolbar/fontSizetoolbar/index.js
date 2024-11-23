// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
// import { $getSelection, $isRangeSelection, $isTextNode } from 'lexical';
// import { $createFontSizeNode, $isFontSizeNode } from '../../nodes/fontSizeNode/FontSize'; // Adjust path if needed

// const FontSizeToolbar = () => {
//   const [editor] = useLexicalComposerContext();

//   const applyFontSize = (fontSize) => {
//     editor.update(() => {
//       const selection = $getSelection();
//       if ($isRangeSelection(selection)) {
//         selection.getNodes().forEach((node) => {
//           if ($isTextNode(node)) {
//             if ($isFontSizeNode(node)) {
//               node.getWritable().setFontSize(fontSize);
//             } else {
//               const fontSizeNode = $createFontSizeNode(node.getTextContent(), fontSize);
//               node.replace(fontSizeNode);
//             }
//           }
//         });
//       }
//     });
//   };

//   return (
//     <div>
//       <button onClick={() => applyFontSize('12px')}>12px</button>
//       <button onClick={() => applyFontSize('16px')}>16px</button>
//           <button onClick={() => applyFontSize('20px')}>20px</button>
//            <button onClick={() => applyFontSize('30px')}>30px</button>
//     </div>
//   );
// };

// export default FontSizeToolbar;

import { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, $isTextNode } from 'lexical';
import { $createFontSizeNode } from '../../nodes/fontSizeNode/FontSize'; // Adjust the path as needed

const FontSizeToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [fontSize, setFontSize] = useState(16); // Default font size

  const applyFontSize = (size) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            const fontSizeNode = $createFontSizeNode(node.getTextContent(), size);
            node.replace(fontSizeNode);
          }
        });
      }
    });
  };

  const incrementFontSize = () => {
    const newSize = Math.min(fontSize + 1, 72); // Max font size limit 72px
    setFontSize(newSize);
    applyFontSize(newSize + 'px');
  };

  const decrementFontSize = () => {
    const newSize = Math.max(fontSize - 1, 1); // Min font size limit 1px
    setFontSize(newSize);
    applyFontSize(newSize + 'px');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <button onClick={decrementFontSize} style={buttonStyle}>-</button>
      <div style={{ margin: '0 8px' }}>{fontSize}px</div>
      <button onClick={incrementFontSize} style={buttonStyle}>+</button>
    </div>
  );
};

const buttonStyle = {
  backgroundColor: 'white',
  border: '1px solid #ccc',
  padding: '5px 10px',
  cursor: 'pointer',
  fontSize: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '30px',
  height: '30px',
};

export default FontSizeToolbar;

