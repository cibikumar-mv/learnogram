import React from "react";
import { Avatar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const DeleteField = (props) => {
  return (
    <Avatar onClick={()=>{props.deleteClick(props.index)}} sx={{ bgcolor: "error.main" }}>
      <DeleteForeverIcon></DeleteForeverIcon>
    </Avatar>
  );
};

export default DeleteField;
