import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';  

const schema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 255,
        trim : true
    },
    username: {
        type: String,
        required:true,
        unique: true,
        minLength : 3,
        maxLength : 255
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength :8,
        maxLength :255,
        pattern : /[a-zA-Z0-9.*]/
    },
    gender:{
        type:String,
        enum : ["Male", "Female", "Other"],
        required:true,
    },
    interest:{
        type: Array
    },
    timestamp:{
        type: Date,
        default : Date.now    
    }
})

schema.methods.generateToken = function()
{
    const token = jwt.sign({id : this._id}, process.env.PRIVATEKEY);
    return token;
}

const model = mongoose.model('users', schema);

export default model;