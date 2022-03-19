//React Imports
import React, { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";
import Navbar from "../../Navbar/Navbar";
import UserProfile from "./UserProfile";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
//Local Imports
import { fetchOne } from "../../../actions/posts";
import Content from "./Content";
import { LikePost } from "./Like";
const ShowPost = () => {
  //declarations
  const dispatch = useDispatch();
  //hooks
  useEffect(() => {
    dispatch(fetchOne("621ca739bb263703c4b7eaa3"));
  }, [dispatch]); 
  return (
    <>
      <Navbar />
      <Grid container spacing={1} sx={{ pt: 2 }}>
        <Grid item xs={11}>
          <Paper
            elevation={9}
            sx={{
              width: "100%",
              height: "100%",
              color: "red",
              bgcolor: "grey",
            }}
          >
            <Grid item>
              <UserProfile />
            </Grid>
            <Grid item>
              <Content />
            </Grid>
            <Grid item>
              <Comment />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <LikePost />
        </Grid>
      </Grid>
    </>
  );
};

export default ShowPost;
