const Joi = require('joi') 

const nameRule = Joi.string().min(3).required().pattern(new RegExp(/^[a-zA-Z ]+$/))
.message({"string.pattern.base":"Name must contain only Alphabets"});
const passRule = Joi.string().min(8).required();
const emailRule = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'edu','in'] } }).required();
const genderRule = Joi.string().valid('Male','Female').required();
const ageRule = Joi.number().min(1).required();
const numberRule = Joi.string().length(10).required().pattern(new RegExp(/^[0-9]+$/)).message({"string.pattern.base":"Number must contain only Integers"});

const schemas = { 
  parentRegister: Joi.object().keys({ 
    name: nameRule,
    number: numberRule,
    password: passRule,
  }),
  studentRegister: Joi.object().keys({
    name: nameRule,
    email: emailRule,
    password: passRule,
    gender : genderRule,
    age : ageRule,
    avl : Joi.string().valid('yes','no').required(),
    character : Joi.string().required(),
    timeId : Joi.string().required(),
    dateId : Joi.string().required(),
    language : Joi.string().valid('English','Tamil').required(),
  }),
  teacherRegister: Joi.object().keys({ 
    name: nameRule,
    number : numberRule,
    email: emailRule, 
    password: passRule,
    gender : genderRule,
    age : ageRule,

  })  
}; 
module.exports = schemas;

