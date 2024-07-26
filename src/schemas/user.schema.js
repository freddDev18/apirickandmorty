const Joi = require('joi');

const id = Joi.string().uuid();
const fullName = Joi.string().min(3).max(100);
const jobArea = Joi.string().max(50);
const email = Joi.string().email();
const isBlock = Joi.bool();

const createUserSchema = Joi.object({
    fullName: fullName.required(),
    jobArea: jobArea.required(),
    email: email.required(),
    isBlock,
});

const updateUserSchema = Joi.object({
    fullName,
    jobArea,
    email,
});

const findUserSchema = Joi.object({
    id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, findUserSchema };
