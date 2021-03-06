import React,{useEffect} from "react";
import { Grid, Paper } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography,Avatar } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { useDispatch, useSelector } from "react-redux";
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "./contentStyle.css";

const UserProfile = () => {
  const {post, isLoading} = useSelector((state) => state.posts);
  useEffect(() => {
    console.log("userProfiele Post: ",post);
  }, [post]);
  if(!isLoading && post){
    return (
      <div>
        <Grid container sx={{pl:5,pt:5}}>
        <Avatar sx={{ width: { xs: 40, md: 50 }, height: { xs: 40, md: 50 }, }} src={post ? post?.user_id?.imageUrl: "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.stickpng.com%2Fimg%2Ficons-logos-emojis%2Fusers%2Fsimple-user-icon&psig=AOvVaw3Roda4pIDTP717x8Gui8Ah&ust=1647771685290000&source=images&cd=vfe&ved=2ahUKEwjYv4aB-tH2AhW7R2wGHR5lBxUQr4kDegUIARDeAQ"} />
          <Grid sx={{pl:2}}>
            <Grid item sx={{pb:1}}>
              <Typography color="#000000">{post?.user_id?.name ? post?.user_id?.name : "name" }</Typography>
            </Grid>
            <Grid item>
              <Typography color="#000000">
              {post ?"@"+post?.user_id?.username : "username" }
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
        <div className="avatar"> 
          <Skeleton
              circle
              height="100%"
              containerClassName="avatar-skeleton"
          /> 
                    
        </div>
          <Grid sx={{pl:2}}>
            <Grid item sx={{pb:1}}>
              <Skeleton width="200px"/> 
            </Grid>
            <Grid item>
              <Typography>
              <Skeleton width="200px"/>
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
