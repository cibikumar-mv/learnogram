import mongoose from 'mongoose'; 

const schema = new mongoose.Schema({
    postId : {
        type : String,
        required : true,
        ref: 'posts',
    },
    comment: { 
        required : true,
        // type: String, 
        // ref: 'users'
        type: Array

    },
    
})




const postModel = mongoose.model('posts', schema);
export default postModel;