import mongoose from 'mongoose'; 

const schema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 255,
        trim : true
    },
    user_id: { 
        required : false,
        type: String, 
        ref: 'users'
    },
    tags : {
        type : Array,
        required : true,
    },
    content : {
        type : Array,
        required : true
    },
    type : {
        required : true,
        type : String,
        enum : ['Completed', 'In Progress', 'Suggestion']
    },
    views:{
        type:Number,
        required:true,
        default:0,
    },
    comment:{
        type:Array,
    },
    likes:{
        type: Number,
        default:0,

    },
    thumbnail:{
        type:String,
    },
    shortDec:{
        type:String,
    },
    timestamp:{
        type: Date,
        default : Date.now    
    }
})




const postModel = mongoose.model('posts', schema);
export default postModel;