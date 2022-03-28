import { Paper, Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useState, useEffect } from "react";
import "./contentStyle.css";
import { useDispatch, useSelector } from "react-redux";

export const LikePost = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const [like, setLike] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    // console.log("Likes:",posts.likes?.length-posts.dislikes?.length);
    setLike(posts.likes?.length - posts.dislikes?.length);
    // setCommentCount(posts.comment.length);
  }, [posts]);

  const setUpvote = () => {
    setLike(like + 1);
  };
  const setDownvote = () => {
    setLike(like - 1);
  };

  const Likes = () => {
    if(posts.likes && posts.likes.length > 0){
      const liked = posts.likes.find((like)=>like === user.username);
      const disLiked = posts.dislikes.find((dislike)=>dislike === user.username);
      if(liked){

      }
      else if(disLiked){
      }
      else{
        console.log("In else");
      }
    }
  };

  return (
    <div className="stickyParent">
      <Paper
        elevation={9}
        className="stickyComp"
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Like
        {/* <Button disabled={!user?.result}>
          <KeyboardDoubleArrowUpIcon
            sx={{ fontSize: 40, cursor: "pointer", pt: 2, pb: 2 }}
            onClick={setUpvote}
          />
        </Button>
          {like}
        <Button disabled={!user?.result}>
          <KeyboardDoubleArrowDownIcon
            sx={{ fontSize: 40, cursor: "pointer", pt: 2, pb: 2 }}
            onClick={setDownvote}
          />
        </Button> */}
        <CommentIcon sx={{ fontSize: 30, cursor: "pointer", pb: 2 }} />
        <ShareIcon sx={{ cursor: "pointer", pb: 2 }} />
      </Paper>
    </div>
  );
};
