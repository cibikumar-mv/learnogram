import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import Icon from "./icon.jsx";
import { signin, signup } from "../../actions/auth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  ListItemText,
  ListItemIcon,
} from "@mui/material/";
import * as styles from "./styles";
const Form = () => {
  //declarations
  const options = ["AI", "ML", "React", "Angular", "Cloud Computing"];
  const dispatch = useDispatch();
  const googleID = process.env.REACT_APP_CLIENT_ID;
  const initialState = {
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
    interest: [],
  };
  

  //states
  const [signIn, setSignIn] = useState(true);
  const [form, setForm] = useState(initialState);
  const [selected, setSelected] = useState([]);
  const [errors, setErrors] = useState({...initialState, interest: ""});
  // const navigate = useNavigate();

  //functions
  const googleSuccess = (e) => {
    console.log(e);
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
    const userNameRegex = new RegExp(
      "^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
    );
    const passwordRegex = new RegExp(
      "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"
    );

    const emailRegex = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    if ("name" in fieldValues)
      temp.name = fieldValues.name.length === 0 ? "Enter Your Name" : "";
    if ("username" in fieldValues)
      temp.username = !userNameRegex.test(fieldValues.username)
        ? "Only alphanumeric characters, underscore and dot with at least 4 characters long"
        : "";
    if ("password" in fieldValues)
      temp.password = !passwordRegex.test(fieldValues.password)
        ? "One Uppercase,One Lowercase,One Digit,One Special character,at least 8 characters"
        : "";
    if ("confirmPassword" in fieldValues){
      temp.confirmPassword = fieldValues.confirmPassword !== form.password? "Confirm Password must match Password": "";
    }
    if ("email" in fieldValues)
      temp.email = !emailRegex.test(fieldValues.email) ? "Invalid Email" : "";
    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender.length === 0 ? "Please Select one" : "";
    if ("interest" in fieldValues){
      temp.interest =
        fieldValues.interest.length === 0 ? "Please select your interests" : "";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === form)
      return Object.values(temp).every((val) => val === "");
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    setSelected(value);
    setForm({ ...form, interest: value });
    validation({ 'interest': e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signIn) {
      dispatch(signin(form));
    } else {
      dispatch(signup(form));
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
                label="Username\Email"
                placeholder="Enter email/username"
                fullWidth
                required
                name="username"
                onChange={handleChange}
                value={form.username}
                sx={styles.fieldStyle}
                helperText="Please enter your username or email"
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
                label="Username"
                placeholder="Enter your Username"
                name="username"
                fullWidth
                onChange={handleChange}
                value={form.username}
                sx={styles.fieldStyle}
                error={errors.username !== ""}
                helperText={errors.username}
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
              <FormControl error={errors.gender !== ""} component="fieldset" style={styles.marginTop}>
                <FormLabel sx={styles.fieldStyle} component="legend">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}
                  onChange={handleChange}
                  required
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}   
                    label="Male"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <FormHelperText>{errors.gender}</FormHelperText>
              </FormControl>

              <FormControl
                fullWidth
                error={errors.interest !== ""}
                // helperText={errors.interest}
              >
                <InputLabel>Select your interest</InputLabel>

                <Select
                  multiple
                  sx={styles.fieldStyle}
                  
                  value={selected}
                  label="select your interest"
                  onChange={handleSelect}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      <ListItemIcon>
                        <Checkbox checked={selected.indexOf(option) > -1} />
                      </ListItemIcon>
                      <ListItemText primary={option} />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{errors.interest}</FormHelperText>
              </FormControl>

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
