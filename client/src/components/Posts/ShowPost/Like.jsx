import {  Paper } from "@mui/material";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { useState,useEffect } from "react";
import "./contentStyle.css";
import { useDispatch, useSelector } from "react-redux";


export const  LikePost=()=>{
  const posts = useSelector((state) => state.posts);
  const [like,setLike]=useState(0);
  useEffect(() => {
    // console.log("from ",posts);
    setLike(posts.likes);
  }, [posts]);
     //state 
     console.log("from likes",posts.likes);
    //  const likesInDb = ;
    //  console.log(likesInDb);
  const setUpvote=()=>{
    setLike(like+1);
  }
  const setDownvote=()=>{
    setLike(like-1);
  }
    return(
        <div className="stickyParent">
            <Paper
            elevation={9}
            className="stickyComp"
            sx={{

              height: '100%',
              width:'100%',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              justifyContent:'space-around',          
            }}
          >
              <KeyboardDoubleArrowUpIcon sx={{fontSize:40,cursor:'pointer',pt:2,pb:2}} onClick={setUpvote}/>
              {like}
              <KeyboardDoubleArrowDownIcon sx={{fontSize:40,cursor:'pointer',pt:2,pb:2}} onClick={setDownvote}/>
              <CommentIcon sx={{fontSize:30,cursor:'pointer', pb:2}}/>
              <ShareIcon sx={{cursor:'pointer',pb:2}} />
          </Paper>
            </div>
    )
}


