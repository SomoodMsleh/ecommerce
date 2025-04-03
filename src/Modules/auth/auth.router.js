import { Router } from "express";
import {confirmEmail, register} from './auth.controller.js';
const router = Router();
router.post('/register',register);
router.get('/confirmEmail/:token',confirmEmail);
export default router