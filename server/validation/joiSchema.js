import Joi from 'joi';

const nameRule = Joi.string().min(3).required().pattern(new RegExp(/^[a-zA-Z ]+$/))
.message({"string.pattern.base":"Name must contain only Alphabets"});
const userNameRule = Joi.string().min(3).required().pattern(new RegExp(/^[a-zA-Z0-9_. ]+$/))
.message({"string.pattern.base":"userName must contain only Alphabets"});
const passRule = Joi.string().min(8).required();
const emailRule = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'edu','in'] } }).required();
const genderRule = Joi.string().valid('Male','Female').required(); 


const schemas = {  
  
  userRegister: Joi.object().keys({
    name: nameRule,
    username: userNameRule,
    email: emailRule,
    password: passRule,
    confirmPassword : passRule,
    gender : genderRule,
    interest : Joi.required(),
  })
}; 
export default schemas;

