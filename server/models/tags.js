import mongoose from 'mongoose'; 

const tagSchema = new mongoose.Schema({
    tagname : {
        type : String,
        required : true,
        minLength : 3,
        maxLength : 255,
        trim : true
    }, 
    postId : {
        type: Array,
        required : true
    },
    timestamp:{
        type: Date,
        default : Date.now    
    }
})

const tagModel = mongoose.model('tags', tagSchema);

export default tagModel;