import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {createProduct, deleteProduct, getActiveProduct, getAllProduct, getDetailsProduct} from "./product.controller.js";
import fileUpload from '../../utils/multer.js';
import {fileValidation} from '../../utils/multer.js';
import {asyncHandler} from "../../utils/catchError.js";
const router = Router();

router.post('/create',auth(['Admin']),fileUpload(fileValidation.image).fields([
    {name:"mainImage",maxCount:1},
    {name:"subImages",maxCount:5}
]),asyncHandler(createProduct));

router.get('/active',asyncHandler(getActiveProduct));
router.get('/',auth(['Admin']),asyncHandler(getAllProduct));
router.get('/details/:id',asyncHandler(getDetailsProduct));
router.delete('/:id',auth(['Admin']),asyncHandler(deleteProduct));


export default router