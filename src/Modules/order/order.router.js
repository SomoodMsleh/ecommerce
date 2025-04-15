import { Router } from "express";
import {createOrder} from "./order.controller.js";
import {auth} from "../../middleware/auth.js";
import {asyncHandler} from "../../utils/catchError.js"

const router = Router();

router.post('/',auth(['user']),asyncHandler(createOrder));
export default router