//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
//Local Imports
import "./contentStyle.css";
//import css

const Content = () => {
  //declarations
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const ary = [1];
  //hooks
  useEffect(() => {
    console.log(posts);
  }, [posts]);
 
  return (
    <Grid
      
      container
      spacing={1}
      direction="column"
      alignItems="center"
      justifyContent="space-around"
      // style={{ minHeight: '100vh' }}
    >
      {/* {posts.content &&
        posts.content.map((item) => (
          <Grid item xs={12}>
            {}
          </Grid>
        ))} */}

      {posts.content && 
        posts.content.map((input, idx) => {
          return (
            <>
            <Grid item key={idx} >
              {input.type === "TextFiled" ? (
                <>
                <Typography variant="h4" className="text" value={input.value} >{input.value}</Typography>
                </>
              ) : input.type === "Image" ? (
                <>
                <img src={input.value} alt="A" className="img"
                 />
                </>
              ) : input.type === "Link" ? (
                <>
                <Typography value={input.value} > {input.value}</Typography>
                </>
              ) : null}
            </Grid>
            {/* <Grid item key={idx}>
              {input.type === "TextFiled" ? (
                <>
                <Typography value={input.value} >{input.value}</Typography>
                </>
              ) : input.type === "Image" ? (
                <>
                <img src={input.value} alt="A" />
                </>
              ) : input.type === "Link" ? (
                <>
                <Typography value={input.value} > {input.value}</Typography>
                </>
              ) : null}
            </Grid>
             */}
            </>
            
          );
        })}
    </Grid>
  );
};

export default Content;
