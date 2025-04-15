import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {createCoupon, getCoupon} from './coupon.controller.js';
import {asyncHandler} from "../../utils/catchError.js"
const router = Router();

router.post('/create',auth(['Admin']),asyncHandler(createCoupon));
router.get('/',auth(['Admin']),asyncHandler(getCoupon));
export default router