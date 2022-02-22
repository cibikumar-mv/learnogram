import React from "react";
import { Grid } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
const UserProfile = () => {
  return (
    <div className="profile">
      <Grid container sx={{pl:5}}>
        <AccountCircleIcon sx={{ fontSize: 60}} />
        <Grid sx={{pl:2}}>
          <Grid item sx={{pb:1}}>
            <Typography>name</Typography>
          </Grid>
          <Grid item>
            <Typography>
              @username
              {/* <StarOutlinedIcon sx={{ fontSize: 23, color: "blue" }} /> */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default UserProfile;
