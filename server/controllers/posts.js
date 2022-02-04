import postModel from "../models/posts.js";
import _ from "lodash";

export const createPost = async (req, res) => {
  const newPost = new postModel(
    _.pick(req.body, ["title", "email", "tags", "postContent", "views"])
  );
  try {
    const result = await newPost.save();
    console.log(result);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: "false", error: "Something went wrong" });
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
