const Joi = require("joi");

module.exports.schema = Joi.object({
    
        title: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().trim(),
        country: Joi.string().required().trim(),

        "image.url": Joi.string().trim().uri().allow("", null),
        
   
});
