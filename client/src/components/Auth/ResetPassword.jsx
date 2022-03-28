import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Box,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.jsx";
import { signin, googleSignIn } from "../../actions/auth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { SAVE } from "../../constants/actionTypes";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import * as styles from "./styles";
const ResetPassword = () => {
  //declarations
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    newPassword: "",
    confirmPassword: "",
  };

  //states
  const [isReset, setIsReset] = useState(false);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({ ...initialState });
  const { userID, token } = useParams();
  useEffect(() => {
    console.log("userID:", userID);
    console.log("token:", token);
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate]);

  //functions
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    validation({ [e.target.name]: e.target.value });
  };

  const validation = (fieldValues = form) => {
    let temp = { ...errors };
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"
    );
    if ("newPassword" in fieldValues)
      temp.password = !passwordRegex.test(fieldValues.password)
        ? "One Uppercase,One Lowercase,One Digit,One Special character,at least 8 characters"
        : "";
    if ("confirmPassword" in fieldValues) {
      temp.confirmPassword =
        fieldValues.confirmPassword !== form.newPassword
          ? "Confirm Password must match Password"
          : "";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === form)
      return Object.values(temp).every((val) => val === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, userID, token };
    console.log("form:", data);
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
          <h2 style={styles.headerStyle}>Reset Password</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          {!isReset ? (
            <>
              <TextField
                type="password"
                fullWidth
                label="New Password"
                placeholder="Enter your password"
                name="newPassword"
                onChange={handleChange}
                sx={styles.fieldStyle}
                error={errors.newPassword !== ""}
                helperText={errors.newPassword}
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
              <br />
              <br />
            </>
          ) : (
            <></>
          )}
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
