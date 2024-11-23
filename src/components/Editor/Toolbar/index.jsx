import { Grid } from "@mui/material";
import pluginsList from "./toolbarIconsList";
import useOnClickListener from "./useOnClickListener";
import { createPortal } from "react-dom";
import FloatingLinkEditor from "./FloatingLinkEditor";
import FontSizeToolbar from "../Toolbar/fontSizetoolbar/index"
import FontColorToolbar from "./fontcolor/index";
const Toolbar = () => {
  const { onClick, isLink, editor, modal } = useOnClickListener();
  return (
    <Grid
      container
      sx={{ background: "white", width: "100%", py: 1, px: 1 }}
      justifyContent="space-between"
    >
      {pluginsList.map((plugin) => (
        <Grid item key={plugin.id}>
          <plugin.Icon onClick={() => onClick(plugin.event)} />
        </Grid>
      ))}
       <FontColorToolbar />
      <FontSizeToolbar />
      {isLink &&
        createPortal(<FloatingLinkEditor editor={editor} />, document.body)}

      {modal}
    </Grid>
  );
};



export default Toolbar;
