import postModel from "../models/posts.js";
import model from "../models/users.js";
import _ from "lodash";

export const createPost = async (req, res) => { 

  const newPost = new postModel(
    _.pick(req.body, ["title", "tags", "content", "type"])
  );
  newPost.user_id = req.body.user_id;

  try {
    const result = await newPost.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send({ success: "false", error: "Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  try {
    const postResult = await postModel.find({});
    res.send(postResult);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", error: "Something went wrong" });
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
          res
            .status(200)
            .json({ success: "true", msg: "Post deleted successfully" });
        }
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ success: "false", msg: "Something went wrong" });
  }
}; 

export const getPostOfUserByUserId = async (req, res) => { 
  try {
    const postResult = await postModel.find({ user_id : req.params.id }); 
    res.send(postResult);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", error: "Something went wrong" });
  }
};