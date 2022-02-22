import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
import { signin, signup, googleSignIn } from "../../actions/auth";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { AUTH } from "../../constants/actionTypes";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ProfileComp from "./ProfileComp";
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

const Details = () => {
  //declarations
  const formData = useSelector((state) => state.auth);
  const initialState = {
    username: "",
    gender: "",
    interest: [],
    imageUrl: formData.isGoogle ? formData.imageUrl : "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const options = ["AI", "ML", "React", "Angular", "Cloud Computing"];

  //hooks
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({
    gender: "",
    interest: "",
    username: "",
  });

  useEffect(() => {
    console.log("formdata from google:", formData);
    console.log("data from local", form);
    if (localStorage.getItem("profile")) {
      navigate("/");
    }
  }, [navigate, formData]);

  //functions

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      dispatch(signup({ ...formData, ...form }, navigate));
    }
  };

  const handleImageChange = (base) => {
    setForm((prevState) => ({
      ...prevState,
      imageUrl: base,
    }));
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
    if ("username" in fieldValues)
      temp.username = !userNameRegex.test(fieldValues.username)
        ? "Only alphanumeric characters, underscore and dot with at least 4 characters long"
        : "";
    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender.length === 0 ? "Please Select one" : "";
    if ("interest" in fieldValues) {
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
    validation({ interest: e.target.value });
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
          <h2 style={styles.headerStyle}>We are so excited to have you!</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel sx={styles.fieldStyle} component="legend">
              Profile Picture
            </FormLabel>
            <ProfileComp
              imageChange={handleImageChange}
              value={form.imageUrl}
            />
          </FormControl>
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
          <FormControl
            error={errors.gender !== ""}
            component="fieldset"
            style={styles.marginTop}
          >
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
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
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

          <br />
          <br />
          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Register
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Details;
