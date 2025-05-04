import {check } from "express-validator";

export const loginValidation = [
    check('email')
    .notEmpty()
    .isString()
    .isEmail(),

    check('password')
    .notEmpty()
    .isString()
    

    
]

