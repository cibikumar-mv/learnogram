//React Imports
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import CommentIcon from "@mui/icons-material/Comment";
import TelegramIcon from "@mui/icons-material/Telegram";

//themes
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const GetPost = () => {
  //fuctions
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width:25, height:25 }}>
            R
          </Avatar>
        }
        title="Username_007"
        subheader="September 14, 2016"
      />
      <Divider variant="string" />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
      
        <Typography variant="body2" color="text.secondary">
          Short description of the post is shown here.
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
          {0}
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

export default GetPost;
