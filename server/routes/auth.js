import express from 'express';
import { login } from '../controllers/users';
import lodash from 'lodash';
const router = express.Router();

router.post('/', login);

exports = router;