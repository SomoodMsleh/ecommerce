import { Router } from "express";
import { createCategory, getActiveCategory, getAllCategory } from './category.controller.js';
import { auth } from "../../middleware/auth.js";
const router = Router();
router.post('/create',auth(["Admin"]),createCategory);
router.get('/',auth(['Admin']),getAllCategory);
router.get('/getActiveCategory',getActiveCategory);
export default router