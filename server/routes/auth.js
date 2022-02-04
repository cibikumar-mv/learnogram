import express from 'express';
import { login, signup } from '../controllers/users.js';
import lodash from 'lodash';
const router = express.Router();

console.log("signup");
router.post('/login', login);
router.post('/signup', signup);

export default router;