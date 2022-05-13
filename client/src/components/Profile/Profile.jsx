//React Imports
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Grid,
  Box,
  Avatar,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Navbar from "../Navbar/Navbar";
import "./profileStyle.css";
import SinglePost from "../Posts/MiniPost/SinglePost";
import { userPost } from "../../actions/user";

const Profile = () => {
  //Declarations
  const user = JSON.parse(localStorage.getItem("profile")); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user.posts);
  const { username } = useParams();
  const isOwner = user.result.username === username;
  //Hooks
  useEffect(() => {
    if (!localStorage.getItem("profile")) {
      navigate("/auth");
    }
    dispatch(userPost(user.result.id, username));
  }, [navigate]);

  console.log("User Posts:", posts);
  // console.log(userPost(user.result.id);
  var temp = user.result.bio;
  // dispatch(userPost(user.result.id));
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Navbar />
      <Grid container spacing={2}>
        <Grid item xs className="profileDetCon">
          <div className="proCon">
            <div className="profilePicCon">
              <Avatar
                sx={{
                  width: { xs: 280, md: 280 },
                  height: { xs: 280, md: 280 },
                }}
                src={user.result.imageUrl}
              />
            </div>
          </div>
          <Typography variant="h4" textAlign="center" sx={{ mt: 5 }}>
            @{user.result.username}
          </Typography>
          <Typography variant="h6" textAlign="center">
            {user.result.name}
          </Typography>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <ThumbUpIcon sx={{ width: 50, height: 50, mr: 2 }} />
            <Typography variant="h5">0</Typography>{" "}
          </Box>
          <div className="bioContainer">{user.result.bio}</div>
          <div className="bioContainer">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Post</TableCell>
                    <TableCell>{0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Followers</TableCell>
                    <TableCell>{0}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Following</TableCell>
                    <TableCell>{0}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </div>
          <Button variant="outlined" sx={{ m: "2%", width: "90%" }}>
            Edit Profile
          </Button>
        </Grid>
        <Grid item xs={9}>
        <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
        <div className="miniPostCon">
        
          {posts.map((ele, idx) => (
            <SinglePost details={ele} />
            ))}
            </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
