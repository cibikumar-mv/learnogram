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
} from "@mui/material";
import { forgotPass } from "../../actions/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState(false);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Paper
        elevation={20}
        sx={{ padding: "30px 20px", width: 300, margin: "20px auto" }}
      >
        {isSubmit ? (<><form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(forgotPass({ email: email }));
          }}
        >
          <TextField
            label="Email"
            placeholder="Enter your Email"
            fullWidth
            required
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <br />
          <br />

          <Button
            sx={{ mb: 2 }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Send Verification Link
          </Button>
        </form></>):(<><Typography variant="h5" gutterBottom>Reset link has been sent to your email</Typography>
        <Typography variant="caption" gutterBottom>Use that link to reset password</Typography></>)}
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
