import { Router } from "express";
import {confirmEmail, login, register} from './auth.controller.js';
const router = Router();
router.post('/register',register);
router.get('/confirmEmail/:token',confirmEmail);
router.post('/login',login);
export default router