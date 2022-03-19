import React,{useEffect} from "react";
import { Grid, Paper } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography,Avatar } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useDispatch, useSelector } from "react-redux";

import "./contentStyle.css";

const UserProfile = () => {
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    console.log("from ",posts);
  }, [posts]);
  if(posts.length != 0){
    console.log("in posts",posts);
    return (
      <div>
        <Grid container sx={{pl:5,pt:5}}>
        <Avatar sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, }} src={posts ? posts.user_id.imageUrl: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.stickpng.com%2Fimg%2Ficons-logos-emojis%2Fusers%2Fsimple-user-icon&psig=AOvVaw3Roda4pIDTP717x8Gui8Ah&ust=1647771685290000&source=images&cd=vfe&ved=2ahUKEwjYv4aB-tH2AhW7R2wGHR5lBxUQr4kDegUIARDeAQ"} />
          <Grid sx={{pl:2}}>
            <Grid item sx={{pb:1}}>
              <Typography color="#000000">{posts.user_id.name ? posts.user_id.name : "name" }</Typography>
            </Grid>
            <Grid item>
              <Typography color="#000000">
              {posts ?"@"+posts.user_id.username : "username" }
                {/* <StarOutlinedIcon sx={{ fontSize: 23, color: "blue" }} /> */}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }else{
    return (
      <div className="profile">
        <Grid container sx={{pl:5,pt:5}}>
        <Avatar sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, }} src= "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.stickpng.com%2Fimg%2Ficons-logos-emojis%2Fusers%2Fsimple-user-icon&psig=AOvVaw3Roda4pIDTP717x8Gui8Ah&ust=1647771685290000&source=images&cd=vfe&ved=2ahUKEwjYv4aB-tH2AhW7R2wGHR5lBxUQr4kDegUIARDeAQ" />
          <Grid sx={{pl:2}}>
            <Grid item sx={{pb:1}}>
              <Typography>name</Typography>
            </Grid>
            <Grid item>
              <Typography>
              {"@ username" }
                {/* <StarOutlinedIcon sx={{ fontSize: 23, color: "blue" }} /> */}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
  
};
export default UserProfile;
