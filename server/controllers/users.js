import model from "../models/users.js";
import _ from "lodash";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  console.log(req.body);

  if (req.body.password.localeCompare(req.body.confirmPassword) != 0)
    return res.send({ success: "false", error: "Password doesn't match!" });

  const newUser = new model(
    _.pick(req.body, [
      "name",
      "username",
      "email",
      "password",
      "gender",
      "interest",
    ])
  );
  const oldUserName = await model.findOne({ username: newUser.username });
  const oldUserMail = await model.findOne({ email: newUser.email });

  if (oldUserName)
    return res.send({
      success: "false",
      error: "User with the same username already exists",
    });
  if (oldUserMail)
    return res.send({
      success: "false",
      error: "User with the same mail already exists. Try logging in.",
    });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  try {
    const result = await newUser.save();
    const token = result.generateToken();
    console.log(result);
    res.send({ result, token });
    // res.header('x-auth-token', token).send(_.pick(result, ['name', 'email', 'interest']));
  } catch (error) {
    console.log(error);
    res.send({ success: "false", error: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  var user = await model.findOne({ email: req.body.username });
  const userWithUserName = await model.findOne({ username: req.body.username });

  if (!user && !userWithUserName)
    return res.send({
      success: "false",
      error: "User with this Email/Username not found",
    });
  if (!user) user = userWithUserName;

  const resultOfSalt = await bcrypt.compare(req.body.password, user.password);
  if (!resultOfSalt)
    return res.send({
      success: "false",
      error: "Invalid username or password",
    });
  const token = user.generateToken();
  res.send(token);
};