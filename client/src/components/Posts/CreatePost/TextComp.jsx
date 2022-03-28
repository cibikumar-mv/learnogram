import React from "react";
import { Grid, TextField } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteField from "./DeleteField";
const TextComp = (props) => {
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item>
        {/* <TextField id="outlined-basic" value={props.value} minRows={3} onChange={(e)=>{props.inputChange(e,props.index)}} label="Text" variant="outlined"/> */}
        <TextareaAutosize
          onChange={(e) => {
            props.inputChange(e, props.index);
          }}
          value={props.value}
          minRows={3}
          aria-label="maximum height"
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item>
        <DeleteField deleteClick={props.deleteClick} index={props.index} />
      </Grid>
    </Grid>
  );
};

export default TextComp;
