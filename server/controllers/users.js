/////////////////////ALL CORRECT I HOPE DONT CHANGE THE CODE GUYS///////-BY CIBI KUMAR AND DEVA

import model from "../models/users.js";
import _ from "lodash";
import bcrypt from "bcrypt";

export const signup = async (req, res) => { 
  if (
    req.body.isGoogle === false &&
    req.body.password.localeCompare(req.body.confirmPassword) != 0
  )
    return res.send({ success: "false", error: "Password doesn't match!" });

  const newUser = new model(
    _.pick(req.body, [
      "name",
      "username",
      "email",
      "password",
      "gender",
      "interest",
      "isGoogle",
      "imageUrl",
      "googleId",
    ])
  );
  let oldUserName = {},
    oldUserMail = {},
    oldUserGoogleId = {};

  if (newUser.isGoogle === true) {
    ////////////////for google user cibi
    oldUserGoogleId = await model.findOne({ googleId: newUser.googleId });
    console.log(oldUserGoogleId);
    if (oldUserGoogleId)
      return res.json({
        success: "false",
        error:
          "User with the  already GoogleId does not exists can continue signup",
      });
  } else {
    //////////////normal user/////cibi
    oldUserName = await model.findOne({ username: newUser.username });
    oldUserMail = await model.findOne({ email: newUser.email });
    if (oldUserName)
      return res.json({
        success: "false",
        error: "User with the same username already exists",
      }); 
    if (oldUserMail)
      return res.json({
        success: "false",
        error: "User with the same mail already exists. Try logging in.",
      });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
  }
  try {
    // /db entry for both users[normal, google]///cibi
    const result = await newUser.save();
    const token = result.generateToken();
    console.log(result);
    res.send({
      success: "true",
      result: result,
      token: token,
    });
  } catch (error) {
    console.log("Error:",error);
    res.send({ success: "false", error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  console.log("Body:", req.body);

  var user = {};
  if (req.body.isGoogle) {
    ////////////////for google user cibi
    // user = await model.findOne({ googleId: req.body.googleId , isGoogle: true});
    user = await model.findOne({ email:req.body.email});
    console.log("user:", user);
    if (!user) {
      return res.json({
        success: "false-signup",
        error:
          "User with this account credentials doesn't exits",
      });
    }
    else if(!user.isGoogle){
      return res.json({
        success: "false-normalExists",
        error:
          "Normal account exists with this email. Try logging in.",
      }); 
    }
  } else { 
    user = await model.findOne({ email: req.body.email });
    console.log(user, req.body.email)
    if (!user)
      return res.send({
        success: "false",
        error: "User with this Email/Username not found",
      });
    if (user.isGoogle)
      return res.send({
        success: "false",
        error: "Similar email with Google account found. Try logging in with Google Account",
      });
    const resultOfSalt = await bcrypt.compare(req.body.password, user.password);
    if (!resultOfSalt)
      return res.send({
        success: "false",
        error: "Invalid username or password",
      });
  }
  const token = user.generateToken();
  res.send({
    success: "true",
    result: user, 
    token: token,
  });
};
