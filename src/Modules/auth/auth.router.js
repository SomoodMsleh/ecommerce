import { Router } from "express";
import {confirmEmail, login, register, resetPassword, sendCode} from './auth.controller.js';
import {asyncHandler} from "../../utils/catchError.js"
const router = Router();
router.post('/register',asyncHandler(register));
router.get('/confirmEmail/:token',asyncHandler(confirmEmail));
router.post('/login',asyncHandler(login));
router.post('/sendCode',asyncHandler(sendCode));
router.patch('/resetPassword',asyncHandler(resetPassword));
export default router