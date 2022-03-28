//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Link, Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
//Local Imports
import "./contentStyle.css";
//import css

const Content = () => {
  //declarations
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts);
  const ary = [1];
  //hooks
  // useEffect(() => {
  //   console.log(posts);
  // }, [posts]);
  if (posts.length === 0) {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        // style={{ minHeight: '100vh' }}
      >
        <Skeleton
          width="500px"
          count={5}
          style={{ margin: "3%", padding: "3%" }}
        />
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        className="postGrid"
        // style={{ minHeight: '100vh' }}
      >
        {/* {posts.content &&
          posts.content.map((item) => (
            <Grid item xs={12}>
              {}
            </Grid>
          ))} */}
        
        <div className="postTags">
          {posts.tags.map((ele, idx) => {
            return <Chip label={"#" + ele} className="sepTags" key={idx} />;
          })}
        </div>
        <div className="titleContent">
          <Typography variant="h6" className="postProgress" color={"black"}>
            Type:{" "}
            <span
              style={{
                color:
                  posts.type === "Completed"
                    ? "green"
                    : posts.type === "In Progress"
                    ? "red"
                    : "#ffb703",
                fontWeight: 800,
              }}
            >
              {posts.type}
            </span>
          </Typography>
          <Typography variant="h2" component="h2" className="postTitle">
            {posts.title}
          </Typography>
        </div>
        {posts.content &&
          posts.content.map((input, idx) => {
            return (
              <Grid item key={idx}>
                {input.type === "TextField" ? (
                  <>
                    <Typography
                      variant="h4"
                      // color="#000000"
                      className="text"
                      value={input.value}
                    >
                      {input.value}
                    </Typography>
                  </>
                ) : input.type === "Image" ? (
                  <>
                    <img src={input.value} alt="A" className="img" />
                  </>
                ) : input.type === "Link" ? (
                  <>
                    <Link href={input.value} target="_blank">
                      Click Here
                    </Link>
                  </>
                ) : null}
              </Grid>
            );
          })}
      </Grid>
    );
  }
};

export default Content;
