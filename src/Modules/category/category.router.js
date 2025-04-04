import { Router } from "express";
import { createCategory } from './category.controller.js';
import { auth } from "../../middleware/auth.js";
const router = Router();
router.post('/create',auth(["Admin"]),createCategory);

export default router