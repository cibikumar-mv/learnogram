import React from "react";
import { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.jsx";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
} from "@mui/material/";
const Form = () => {
  const clientid =
    "182215503354-10fe3ncs3o5ot40dlbs9n3sdgbj7tepb.apps.googleusercontent.com";
  const paperStyle = { padding: "30px 20px", width: 300, margin: "20px auto" };
  const headerStyle = { margin: 5 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const marginTop = { marginTop: 5, padding: 10 };

  const [signIn, setSignIn] = useState(true);
  const googleSuccess = () => {};
  const googleError = () => {};
  const enableSignUp = () => {
    console.log(signIn);
    setSignIn((prev) => !prev);
  };
  return (
    <Container>
      <Grid>
        <Paper elevation={20} sx={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              {signIn ? <LockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
            </Avatar>
            <h2 style={headerStyle}>{signIn ? "Sign In" : "Sign Up"}</h2>
            {!signIn && (
              <Typography variant="caption" gutterBottom>
                Please fill this form to create an account!
              </Typography>
            )}
            <Typography variant="caption" gutterBottom>
              {signIn ? (
                "Don't have an account?"
              ) : (
                <>
                  <br />
                  "Have an account"
                </>
              )}
            </Typography>{" "}
            <Button variant="text" onClick={enableSignUp}>
              {signIn ? "Sign Up" : "Sign In"}
            </Button>
          </Grid>
          <form>
            {signIn ? (
              <>
                <TextField
                  label="Username\Email"
                  placeholder="Enter email/username"
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                />
                <FormControlLabel
                  control={<Checkbox name="checkedB" color="primary" />}
                  label="Remember me"
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  placeholder="Enter your name"
                />
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter your email"
                />
                <FormControl component="fieldset" style={marginTop}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="gender"
                    style={{ display: "initial" }}
                  >
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField fullWidth placeholder="Enter your phone number" />
                <TextField
                  type="password"
                  fullWidth
                  label="Password"
                  placeholder="Enter your password"
                />
                <TextField
                  type="password"
                  fullWidth
                  label="Confirm Password"
                  placeholder="Confirm your password"
                />
              </>
            )}
            <br />
            <br />
            <Button sx={{mb:2}} type="submit" variant="contained" color="primary">
              {signIn ? "Sign In" : "Sign Up"}
            </Button>
            {signIn && (
              <GoogleLogin
                clientId={clientid}
                render={(renderProps) => (
                  <Button
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="outlined"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
              />
            )}
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Form;
