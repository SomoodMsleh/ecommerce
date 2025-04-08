import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {createCoupon} from './coupon.controller.js';
const router = Router();

router.post('/create',auth(['Admin']),createCoupon);

export default router