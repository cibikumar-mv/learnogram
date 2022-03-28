import model from "../models/users.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const forget = async (req, res) => { 
    var check = {};
    console.log(req.body.email);
    try{
        check = await model.findOne({ email : req.body.email, isGoogle : false});
    }
    catch(error){ 
        console.log(error);
        res.status(400).json({ success: "false", error: "Something went wrong" });
    }
    // console.log("check:",check)
    if(!check){ 
        return res.json({success: "false", error: "User with this account not Found"})
    } 

    const secret = process.env.PRIVATEKEY + check.password;
    const payload = {
        email : check.email,
        id : check._id
    }
    const token = jwt.sign(payload, secret, {expiresIn : '15m'});
    const link = `http://localhost:3000/reset-password/${check.id}/${token}`  
 
    let transporter = nodemailer.createTransport({ 
      service : 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD 
      },
    });
    let info = await transporter.sendMail({
        from : "LearnOGram",
        to : check.email,
        subject : "Password Reset",
        html : `
        <h3>You have requested LearnOGram to Generate Link for Password Reset</h3><br>
        <h1> click in this <a href="${link}">link</a></h1>
        ` 
    }); 
    console.log("Message sent: %s", info.messageId);  
    return res.send("Password email link is send to the email...");
  };



export const resetGet = async (req, res) => {
    const {id, token } = req.params; 
    const check = await model.findOne({ _id : id }); 
    if(!check)
        res.json({success: "false", error: "User with this account not Found"})

    return res.render("login",{ err : errorMsg })
    const secret = process.env.PRIVATEKEY + check.password; 

    try {
        const payload = jwt.verify(token, secret); 
        res.render('resetPassword', {email: check.email});
    } catch (error) { 
        console.log(error.message);
        res.send(error.message);
    }
};