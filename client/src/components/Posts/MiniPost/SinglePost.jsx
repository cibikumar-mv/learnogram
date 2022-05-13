import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CommentIcon from "@mui/icons-material/Comment";
import TelegramIcon from "@mui/icons-material/Telegram";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import "./miniPostStyle.css";
const SinglePost = (props) => {
  const navigate = useNavigate();

  return (
    
      <Card elevation={8}  sx={{ width: 330,m:3, bgcolor:'#F2F2F2',borderRadius:5 }}>
        {props.header && (
          <>
            <CardHeader
            onClick={() => {
              navigate(`/profile/${props.details.user_id.username}`);
            }}
              avatar={
                <Avatar
                  sx={{
                    width: { xs: 40, md: 50 },
                    height: { xs: 40, md: 50 },
                  }}
                  src={props.details.user_id.imageUrl}
                />
              }
              title={props.details.user_id.username}
              subheader={moment(props.details.timestamp).fromNow()}
            />
          </>
        )}
        <Divider variant="string" />
        <CardMedia
          onClick={() => {
            navigate(`/post/${props.details._id}`);
          }}
          component="img"
          height="194"
          image={props.details.thumbnail}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h5" color="text.primary">
            {props.details.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.details.shortDesc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton>
            <KeyboardDoubleArrowUpIcon />
          </IconButton>
          <IconButton>
            <KeyboardDoubleArrowDownIcon />
          </IconButton>
          <Typography variant="body2" color="text.secondary">
            {props.details.likes - props.details.dislikes}
          </Typography>
          <IconButton>
            <CommentIcon />
          </IconButton>
          <IconButton>
            <TelegramIcon />
          </IconButton>
        </CardActions>
      </Card> 
  );
};
export default SinglePost;
