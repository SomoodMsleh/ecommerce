import { Router } from "express";
import {confirmEmail, login, register, resetPassword, sendCode} from './auth.controller.js';
const router = Router();
router.post('/register',register);
router.get('/confirmEmail/:token',confirmEmail);
router.post('/login',login);
router.post('/sendCode',sendCode);
router.patch('/resetPassword',resetPassword);
export default router