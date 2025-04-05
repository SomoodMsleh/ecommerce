import { Router } from "express";
import { createCategory, deleteCategory, getActiveCategory, getAllCategory } from './category.controller.js';
import { auth } from "../../middleware/auth.js";
const router = Router();
router.post('/create',auth(["Admin"]),createCategory);
router.get('/',auth(['Admin']),getAllCategory);
router.get('/getActive',getActiveCategory);
router.delete('/delete/:id',auth(['Admin']),deleteCategory);

export default router