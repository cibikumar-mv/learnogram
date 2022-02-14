import React from "react";
import { Grid, TextField } from "@mui/material";
import DeleteField from "./DeleteField";
const TextComp = (props) => {
  return (
    <Grid container spacing={2} padding={2}>
      <Grid item xs={10}>
        <TextField id="outlined-basic" value={props.value} onChange={(e)=>{props.inputChange(e,props.index)}} label="Text" variant="outlined" />
      </Grid>
      <Grid item xs={2}>
        <DeleteField deleteClick={props.deleteClick} index={props.index} />
      </Grid>
    </Grid>
  );
};

export default TextComp;
