import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {createCoupon, getCoupon} from './coupon.controller.js';
const router = Router();

router.post('/create',auth(['Admin']),createCoupon);
router.get('/',auth(['Admin']),getCoupon);
export default router