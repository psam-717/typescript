import { Router } from "express";
import { getAllUsers, getPersonalData, login, signUp } from "../controllers/user.controller";
import { signUpValidation } from "../validation/signup.validation";
import { validate } from "../validation/validateFields";
import { loginValidation } from "../validation/login.validation";
import { authorization } from "../middlewares/authorization";


const router = Router();

router.post('/signup', signUpValidation, validate , signUp);
router.post('/login', loginValidation, validate, login)
router.get('/get-all-users', authorization, getAllUsers)
router.get('/me', authorization, getPersonalData);
export default router