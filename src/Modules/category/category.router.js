import { Router } from "express";
import { createCategory, deleteCategory, getActiveCategory, getAllCategory, getDetailCategory, updateCategory } from './category.controller.js';
import { auth } from "../../middleware/auth.js";
import {asyncHandler} from "../../utils/catchError.js"
const router = Router();
router.post('/create',auth(["Admin"]),asyncHandler(createCategory));
router.get('/',auth(['Admin']),asyncHandler(getAllCategory));
router.get('/getActive',asyncHandler(getActiveCategory));
router.get('/categoryDetail/:id',asyncHandler(getDetailCategory));
router.put('/edit/:id',auth(['Admin']),asyncHandler(updateCategory));
router.delete('/delete/:id',auth(['Admin']),asyncHandler(deleteCategory));


export default router