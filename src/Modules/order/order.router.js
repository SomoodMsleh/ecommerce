import { Router } from "express";
import {createOrder, getAllOrders, getOrderDetails, getUserOrders} from "./order.controller.js";
import {auth} from "../../middleware/auth.js";
import {asyncHandler} from "../../utils/catchError.js"

const router = Router();

router.post('/',auth(['user']),asyncHandler(createOrder));
router.get('/',auth(['Admin']),asyncHandler(getAllOrders));
router.get('/getUserOrders',auth(['user']),asyncHandler(getUserOrders));
router.get('/:id',auth(['user']),asyncHandler(getOrderDetails));
export default router
