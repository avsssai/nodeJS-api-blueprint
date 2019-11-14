var Joi = require("@hapi/joi");

const registerValidator = data => {
    //make a model schema to be compared against.
  var modelSchema = Joi.object({
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });
//   var { name, email, password } = data;

  return modelSchema.validate(data);
};

const loginValidator = data => {
    //model schema for validation.
  var modelSchema = Joi.object({
    email: Joi.string()
      .email()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  });

//   const {name,email,password} = data;

  return modelSchema.validate(data);
};

module.exports.registerValidator = registerValidator;

module.exports.loginValidator = loginValidator;
