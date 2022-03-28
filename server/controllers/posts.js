import postModel from "../models/posts.js";
import model from "../models/users.js";
import tagModel from "../models/tags.js";
import _ from "lodash";
import textToImage from 'text-to-image';
// import text2png from "text2png";
import fs from "fs";
export const createPost = async (req, res) => {
  console.log(req.body);
  const newPost = new postModel(
    _.pick(req.body, ["title", "tags", "content", "type", "thumbnail", "shortDesc"])
  );
  console.log("mongo:", newPost);
  newPost.user_id = req.userID;
  try {
    const result = await newPost.save();
    if (result.tags) {
      for (var i = 0; i < result.tags.length; i++) {
        const tag = result.tags[i];
        const tagRes = await tagModel.find({ tagname: tag });
        var final = {}
        if (tagRes.length > 0)
          final = await tagModel.updateOne({ tagname: tag }, { $push: { postId: result._id } });
        else {
          const newTag = new tagModel({ tagname: tag, postId: [result._id] });
          final = await newTag.save();
        }
        // console.log(final); 
      }
    }
    res.send({ result, success: "true" });
  } catch (error) {
    console.log(error);
    res.send({ success: "false", error: "Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  try {
    const postResult = await postModel.find({}).populate('user_id', { imageUrl: 1, _id: 0, name: 1, username: 1 });
    for(var i=0;i<postResult.length;i++){
      if(postResult[i].thumbnail.length === 0){
        const dataUri = await textToImage.generateSync(postResult[i].title,{ 
          fontSize: 18,
          fontFamily: 'Arial',
          margin: 50, 
          maxWidth:250,
        }); 
        postResult[i].thumbnail = dataUri;
      } 
    } 
    res.send(postResult);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", error: "Something went wrong" });
  }
};

export const likePost = async (req, res) => {
  // console.log("Like Body:", req.body);
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    if (!post) {
      throw new Error("Post not found");
    }
    else {   
       if(!post.reactions.includes(req.body.user_id)){    
       const result = await postModel.findByIdAndUpdate({ _id: req.params.id },
        {
          $inc : { likes: 1 },
          $push : {reactions : {user_id : req.body.user_id, likeOrDislike : 1}}} ); 
       }
       else{       
       }
    }
    // console.log(post) 
    return res.json({success : "true"});
  } catch (error) {
    console.log(error.message);
    res.json({ success: "false", msg: "Something went wrong" });
  }
};

export const dislikePost = async (req, res) => {
  console.log("disLike Body:", req.body);
  try {
    const post = await postModel.findOne({ _id: req.params.id });
    if (!post) {
      throw new Error("Post not found");
    }
    else {   
      console.log(post.reactions[0].user_id) 
      if(!post.reactions.includes(req.body.user_id)){    
      const result = await postModel.findByIdAndUpdate({ _id: req.params.id },
       {
         $inc : { dislikes: 1 },
         $push : {reactions : {user_id : req.body.user_id, likeOrDislike : -1}}} ); 
      }
      else{ 
       console.log("ekse")      
      }
    }  
    return res.json({success : "true"});
  } catch (error) {
    console.log(error.message);
    res.json({ success: "false", msg: "Something went wrong" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const result = postModel.findByIdAndRemove(
      req.params.id,
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.json({ success: "true", msg: "Post deleted successfully" });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    res.json({ success: "false", msg: "Something went wrong" });
  }
};

export const getPostOfUserByUserId = async (req, res) => {
  try {
    // console.log(req.params.id);
    const postResult = await postModel.find({ user_id: req.params.id });
    res.json({ success: true, result: postResult });
  } catch (error) {
    console.log(error);
    res.json({ success: "false", error: "Something went wrong" });
  }
};
export const getPostOfUserByPostId = async (req, res) => {
  try {
    const postResult = await postModel.findById(req.params.id).populate('user_id', { imageUrl: 1, _id: 0, name: 1, username: 1 });
    // console.log(postResult)
    if (!postResult) {
      return res.json({ success: "false", error: "postId not found" });
    }
    // const user = await model.find({_id: postResult.user_id});
    // postResult.push[imageUrl] = user.imageUrl;
    // console.log(postResult);
    return res.json({ success: "true", result: postResult });
  } catch (error) {
    console.log(error);
    return res.json({ success: "false", error: "Something went wrong" });
  }
};

export const getRandomPost = async (req, res) => {
  try {
    const postResult = await postModel.findRandom({}, {}, { skip: 3, limit: 3 })
    res.send(postResult);

    // console.log(postResult);
  } catch (error) {
    console.log(error);
    res.json({ success: "false", error: "Something went wrong" });
  }
};