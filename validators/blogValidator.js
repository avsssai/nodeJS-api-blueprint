const joi = require("@hapi/joi");

const blogValidator = data => {
  //make a model to be compared against.
  const modelSchema = joi.object({
    title: joi
      .string()
      .min(6)
      .max(255)
      .required(),
    body: joi
      .string()
      .min(6)
      .max(3000)
      .required()
  });

  //compare the model schema to the input.
  return modelSchema.validate(data);
};

module.exports.blogValidator = blogValidator;
