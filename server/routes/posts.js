import express from 'express'; 
const router = express.Router();
import postModel from "../models/posts.js";
import auth from "../middleware/auth.js";
import {createPost, deletePost, getPost, getPostOfUserByUserId,getPostOfUserByPostId,likePost, dislikePost } from '../controllers/posts.js';

console.log("post"); 

router.post('/',auth, createPost);
router.get('/', getPost);  //to get all posts (likes, posttime, thumbnail, title, name , photo, views, tags) 
router.get('/postId/:id', getPostOfUserByPostId);  //gives everything abt given post ID (FULL VERSION)
router.get('/userId/:id', getPostOfUserByUserId); //give only particular user post (likes, posttime, thumbnail, title, name , photo, views, tags)
router.delete('/:id', deletePost);
router.patch('/likePost/:id', likePost);
router.patch('/dislikePost/:id', dislikePost);

export default router;
