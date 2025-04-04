import { Router } from "express";
import { createCategory, getAllCategory } from './category.controller.js';
import { auth } from "../../middleware/auth.js";
const router = Router();
router.post('/create',auth(["Admin"]),createCategory);
router.get('/',getAllCategory);
export default router