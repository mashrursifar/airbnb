const Joi = require("joi");

module.exports.userValidation = Joi.object({
    username: Joi.string().trim().required(),
    email: Joi.string().trim().required(),
    password: Joi.required(),
});
