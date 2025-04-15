import { Router } from "express";
import {auth} from '../../middleware/auth.js';
import { createCart } from './cart.controller.js';
import {asyncHandler} from "../../utils/catchError.js"
const router = Router();
router.post('/create',auth(['user']),asyncHandler(createCart));


export default router