import { Paper, Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { useState, useEffect} from "react";
import "./contentStyle.css";
import {dislikePost, likePost} from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const PostOptions = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [like, setLike] = useState(0);
  let isLiked, isNotLiked;
  const [commentCount, setCommentCount] = useState(0);
  useEffect(() => {
    // if (posts) {
    //   console.log(posts);
    //   setLike(posts.likes?.length - posts.dislikes?.length);
    // }
    // setCommentCount(posts.comment.length);
  }, [posts]);

  const setUpvote = () => {
    setLike(like + 1);
  };
  const setDownvote = () => {
    setLike(like - 1);
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
        {/* <Likes/> */}
        <Button disabled={!user?.result}>
          <KeyboardDoubleArrowUpIcon
            sx={{
              fontSize: 40,
              cursor: "pointer",
              pt: 2,
              pb: 2,
              // color: isLiked ? "blue" : "black",
            }}
            onClick={() => {dispatch(likePost(posts._id))}}
          />
        </Button>
        {like}
        <Button disabled={!user?.result}>
          <KeyboardDoubleArrowDownIcon
            sx={{
              fontSize: 40,
              cursor: "pointer",
              pt: 2,
              pb: 2,
              // color: !isNotLiked ? "black" : !isLiked ? "orange" : "black",
            }}
            onClick={() => {dispatch(dislikePost(posts._id))}}
          />
        </Button>
        <CommentIcon sx={{ fontSize: 30, cursor: "pointer", pb: 2 }} />
        <ShareIcon sx={{ cursor: "pointer", pb: 2 }} />
      </Paper>
    </div>
  );
};

export default PostOptions;
