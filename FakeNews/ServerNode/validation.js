const joi = require('@hapi/joi')

const BUserValidation = joi.object({

    fullname: joi.string()
    .required()
    .min(2)
    .max(40)
    .pattern(/^[a-zA-Z]+$/),
    email: joi.string()
    .email()
    .required(),
    username: joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    permissionlevel: joi.number()
    .max(4)
    .required(),
    password: joi.string()
    .pattern(/^[0-9a-zA-Z]+$/)
    .min(8)
    .max(30),
    phone: joi.string()
    .pattern(/^[0-9]+$/)
    .min(8)
    .max(13),
    billingaddress: joi.string()
    .alphanum(),
    zip: joi.string()
    .allow('')
    .pattern(/^[0-9]+$/),
    restaurants: joi.string()
    .allow(''),
    actionkey: joi.string(),



});

const RUserValidation = joi.object({
    email: joi.string()
    .email()
    .required(),
    google: joi.string() 
});

module.exports.BUserValidation = BUserValidation;
module.exports.RUserValidation = RUserValidation;
