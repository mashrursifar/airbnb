const Joi = require("joi")

module.exports.reviewValidation = Joi.object({
    comment: Joi.string().trim().required(),
    rating: Joi.number().required().min(0).max(5),
})