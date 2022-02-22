import React from "react";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
const Comment = () => {
  return (
    <Grid container sx={{ ml: 5 ,width:'75%'}}>
      <Grid item xs={12}>
        <Typography>Comments</Typography>
      </Grid>
      <Grid container>
        <Grid item  xs={12}>
          <TextField
            multiline
            style={{ width: "100%" }}
            minRows={4}
            placeholder="Your valuable comment goes here..."
          />
        </Grid>
        <Grid container  justifyContent="flex-end">
          <Button sx={{mt:2}}>Post</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default Comment;
