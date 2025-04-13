import { Router } from "express";
import {createOrder} from "./order.controller.js";
import {auth} from "../../middleware/auth.js"
const router = Router();

router.post('/',auth(['user']),createOrder);
export default router