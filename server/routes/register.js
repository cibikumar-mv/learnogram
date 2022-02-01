import express from 'express';
import { signup } from '../controllers/users';
import lodash from 'lodash';
const router = express.Router();

router.post('/', signup);

exports = router;