import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';  

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 255,
        trim : true
    },
    email: {
        type: String,
        required:true,
        minLength : 3,
        maxLength : 255
    },
    tags : {
        type : Array,
        required : true,
    },
    postContent : {
        type : Array,
        required : true,
        minLength :8,
    },
    views:{
        type:Number,
        required:true,
        default:0,
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

const postModel = mongoose.model('posts', schema);

export default postModel;