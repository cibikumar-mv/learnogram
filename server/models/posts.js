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
    dislikes:{
        type: Number,
        default:0,
    },
    reactions : { 
        type : Array,
        default:[]
        // type : {
        //     user_id :{required : false, type: String, ref: 'users'} ,
        //     likeOrDislike : Number
        // }
    },
    thumbnail:{
        type:String,
    },
    shortDesc:{
        type:String,
    },
    timestamp:{
        type: Date,
        default : Date.now    
    }
})




const postModel = mongoose.model('posts', schema);
export default postModel;