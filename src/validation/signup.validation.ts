import {check} from 'express-validator'

export const signUpValidation= [
    check('name')
    .notEmpty()
    .isString()
    .withMessage('Please provide name'),

    check('email')
    .notEmpty()
    .isString()
    .withMessage('Please provide email'),

    check('password')
    .notEmpty()
    .withMessage('Please provide password'),


]