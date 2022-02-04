import express from 'express'; 
const router = express.Router();
import postModel from "../models/posts.js";
import {createPost, deletePost, getPost } from '../controllers/posts.js';

console.log("post"); 

router.post('/', createPost);
router.delete('/:id', deletePost);
router.get('/', getPost); 

export default router;
