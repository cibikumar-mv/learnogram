import express from 'express';   
import { forget, resetGet } from '../controllers/password.js';
const router = express.Router();

router.post('/forget', forget);
router.get('/reset/:id/:token', resetGet);

export default router;