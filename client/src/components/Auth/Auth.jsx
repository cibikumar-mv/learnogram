import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.jsx";
import { signin, googleSignIn } from "../../actions/auth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { SAVE } from "../../constants/actionTypes";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as styles from "./styles";
const Form = () => {
  //declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleID = process.env.REACT_APP_CLIENT_ID;
  const initialState = {
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
  };

  //states
  const [signIn, setSignIn] = useState(true);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState });
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate]);

  //functions
  const googleSuccess = async (res) => {
    const data = res?.profileObj;
    const googleData = {
      name: data.name,
      email: data.email,
      googleId: data.googleId,
      imageUrl: data.imageUrl,
      isGoogle: true,
    };

    try {
      dispatch(signin(googleData, navigate));
    } catch (error) {
      console.log(error);
    }
  };
  const googleError = (error) => {
    console.log(error);
  };

  const switchMode = () => {
    setForm(initialState);
    setSignIn((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validation({ [e.target.name]: e.target.value });
  };

  const validation = (fieldValues = form) => {
    let temp = { ...errors };
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"
    );
    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length === 0 ? "Enter Your Name" : "";
    if ("password" in fieldValues)
      temp.password = !passwordRegex.test(fieldValues.password)
        ? "One Uppercase,One Lowercase,One Digit,One Special character,at least 8 characters"
        : "";
    if ("confirmPassword" in fieldValues) {
      temp.confirmPassword =
        fieldValues.confirmPassword !== form.password
          ? "Confirm Password must match Password"
          : "";
    }
    if ("email" in fieldValues)
      temp.email = !emailRegex.test(fieldValues.email) ? "Invalid Email" : "";
    setErrors({
      ...temp,
    });

    console.log("TEMP:", temp);

    if (fieldValues === form)
      return Object.values(temp).every((val) => val === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn) {
      console.log("Sign In");
      dispatch(signin(form, navigate));
    } else {
      if (validation()) {
        dispatch({ type: SAVE, data: {...form , isGoogle:false} });
        navigate("/details");
      }
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper elevation={20} sx={styles.paperStyle}>
        <Grid align="center">
          <Avatar style={styles.avatarStyle}>
            {signIn ? <LockOutlinedIcon /> : <AddCircleOutlineOutlinedIcon />}
          </Avatar>
          <h2 style={styles.headerStyle}>{signIn ? "Sign In" : "Sign Up"}</h2>
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
                <br></br>
                Have an account?
              </>
            )}
          </Typography>{" "}
          <Button variant="text" onClick={switchMode}>
            {signIn ? "Sign Up" : "Sign In"}
          </Button>
        </Grid>
        <form onSubmit={handleSubmit}>
          {signIn ? (
            <>
              <TextField
                label="Email"
                placeholder="Enter your Email"
                fullWidth
                required
                name="email"
                onChange={handleChange}
                value={form.email}
                sx={styles.fieldStyle}
              />
              <TextField
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                name="password"
                onChange={handleChange}
                value={form.password}
                sx={styles.fieldStyle}
              />
            </>
          ) : (
            <>
              <TextField
                fullWidth
                label="Name"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
                value={form.name}
                sx={styles.fieldStyle}
                error={errors.name !== ""}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={form.email}
                sx={styles.fieldStyle}
                error={errors.email !== ""}
                helperText={errors.email}
              />
              <TextField
                type="password"
                fullWidth
                label="Password"
                placeholder="Enter your password"
                name="password"
                onChange={handleChange}
                sx={styles.fieldStyle}
                error={errors.password !== ""}
                helperText={errors.password}
              />
              <TextField
                type="password"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                placeholder="Confirm your password"
                sx={styles.fieldStyle}
                error={errors.confirmPassword !== ""}
                helperText={errors.confirmPassword}
              />
            </>
          )}
          <br />
          <br />
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </Button>
          {signIn && (
            <GoogleLogin
              clientId={googleID}
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
  );
};

export default Form;
