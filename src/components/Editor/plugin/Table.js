import React, { useState } from "react";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { TableChart } from "@mui/icons-material";
import { $createTableNodeWithDimensions } from "@lexical/table"; // Utility for creating tables
import { $getRoot, $getSelection } from "lexical";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
export default function TablePlugin() {
 const [isOpen, setIsOpen] = useState(false);
  const [rows, setRows] = useState();
  const [columns, setColumns] = useState();
  const [editor] = useLexicalComposerContext();

  const onAddTable = () => {
  if (!rows || !columns) return;

  editor.update(() => {
    try {
      const tableNode = $createTableNodeWithDimensions(
        Number(rows),
        Number(columns)
      );

      // Insert the table node at the current selection or append it to the root.
      const selection = $getSelection();
      if (selection) {
        selection.insertNodes([tableNode]);
      } else {
        const root = $getRoot();
        root.append(tableNode);
      }

      setIsOpen(false); // Close the modal after inserting the table
    } catch (error) {
      console.error("Error while adding table:", error);
    }
  });
};


  return (
    <>
      {/* Add Table Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add Table</DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Rows"
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            fullWidth
            margin="dense"
            autoFocus
          />
          <TextField
            type="number"
            label="Columns"
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsOpen(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={onAddTable}
            color="primary"
            variant="contained"
            disabled={!rows || !columns}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Table Button */}
      <IconButton
        color="primary"
        size="small"
        onClick={() => setIsOpen(true)}
      >
        <TableChart />
      </IconButton>
    </>
  );
}
