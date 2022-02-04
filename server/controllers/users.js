import model from "../models/users.js";
import _ from 'lodash';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => { 
  console.log(req.body);
  const newUser = new model(_.pick(req.body, ['name', 'username','email', 'password','gender','interest']));
  const oldUserName = await model.findOne({ username : newUser.username });
  const oldUserMail = await model.findOne({ email : newUser.email });
  
  if(newUser.password!= req.body.confirmPassword) return res.status(400).json({success: "false",error:"Password doesn't match!"});

  if (oldUserName)
    return res
      .status(400)
      .json({ success: "false", error: "User with the same username already exists" });
  if (oldUserMail)
    return res
      .status(400)
      .json({ success: "false", error: "User with the same mail already exists. Try logging in." });
  

      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      try {
        const result = await newUser.save(); 
        const token = result.generateToken();
        console.log(result);
        res.header('x-auth-token', token).send(_.pick(result, ['name', 'email']));
        
    } catch (error) {
        console.log(error);
        res.status(400).json({success: "false", error: "Something went wrong"});
    }  
  const token = oldUserMail.generateToken();    
  res.send(token);
};

export const login = async (req, res) => {
    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.result[0].message);
    // console.log(req.body);
    const user = await model.findOne({email : req.body.email});
    if(!user) return res.status(404).json({ success: "false", error :"Invalid username or password"});

    const resultOfSalt = await bcrypt.compare(req.body.password, user.password);
    if(!resultOfSalt) return res.status(400).json({success: "false", error: 'Invalid username or password'}); 
    const token = user.generateToken();    
    res.send(token);
}; 

export default login;