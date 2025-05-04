import { Router } from "express";
import { login, signUp } from "../controllers/user.controller";
import { signUpValidation } from "../validation/signup.validation";
import { validate } from "../validation/validateFields";
import { loginValidation } from "../validation/login.validation";


const router = Router();

router.post('/signup', signUpValidation, validate , signUp);
router.post('/login', loginValidation, validate, login)

export default router