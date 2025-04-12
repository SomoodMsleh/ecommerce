import { Router } from "express";
import {auth} from '../../middleware/auth.js';
import { createCart } from './cart.controller.js';

const router = Router();
router.post('/create',auth(['user']),createCart);


export default router