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
    }
})

schema.methods.generateToken = function()
{
    const token = jwt.sign({id : this._id}, process.env.PRIVATEKEY);
    return token;
}

const model = mongoose.model('users', schema);

exports.model = model;