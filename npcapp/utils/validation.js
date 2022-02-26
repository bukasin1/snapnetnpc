const joi = require('joi')

exports.userSchema = joi.object({
    name: joi.string().required(),
    email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: joi.string().required(),
    // cPassword: joi.ref('password'),
    admin: joi.boolean()
})

exports.loginSchema = joi.object({
    email: joi
    .string()
    .trim()
    .lowercase()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }),
    password: joi.string().required()
})

exports.citizenSchema = joi.object({
    name: joi.string().required(),
    gender: joi.string().required(),
    address: joi.string().required(),
    phone: joi.string().required(),
    wardName: joi.string().required(),
    lgaName: joi.string().required(),
    stateName: joi.string().required(),
})