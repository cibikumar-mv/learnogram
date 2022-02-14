import express from 'express';
import { login, signup } from '../controllers/users.js';
import lodash from 'lodash';
import Validate from '../validation/joiValidate.js';
import joiSchema from '../validation/joiSchema.js';
const router = express.Router();

router.post('/login', login);
router.post('/signup', Validate(joiSchema.userRegister), signup);

export default router;