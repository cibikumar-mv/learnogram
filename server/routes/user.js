import express from 'express';   
import { userDetailById,userDetailByUserName } from '../controllers/users.js';
const router = express.Router();

router.get('/user/:id', userDetailById);
router.get('/user/:userName', userDetailByUserName);

export default router;