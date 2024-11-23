
 import { SketchPicker } from "react-color";
import React, { useState } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $isTextNode } from "lexical";
import { $createFontColorNode } from "../../nodes/fontcolor/index";
import { IconButton, Popover } from "@mui/material";
import { FormatColorText } from "@mui/icons-material"; // Icon for Font Color

const FontColorToolbar = () => {
  const [editor] = useLexicalComposerContext();
  const [color, setColor] = useState("#000000"); // Default color
  const [anchorEl, setAnchorEl] = useState(null);

  // Real-time color change: apply color immediately
  const applyFontColor = (selectedColor) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        selection.getNodes().forEach((node) => {
          if ($isTextNode(node)) {
            const textContent = node.getTextContent();
            const fontColorNode = $createFontColorNode(textContent, selectedColor);
            node.replace(fontColorNode); // Replace node with the color-applied node
          }
        });
      }
    });
  };

  const handleColorChange = (color) => {
    setColor(color.hex); // Update the color state
    applyFontColor(color.hex); // Apply the color immediately to the text
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      {/* Font color button with icon and color strip below */}
      <IconButton onClick={handlePopoverOpen}>
        <FormatColorText /> 
      </IconButton>

      {/* Popover for color picker */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <div style={{ padding: 10 }}>
          <SketchPicker
            color={color}
            onChange={handleColorChange}  // Apply color on change
          />
        </div>
      </Popover>
    </div>
  );
};

export default FontColorToolbar;

