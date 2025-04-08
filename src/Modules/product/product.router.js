import { Router } from "express";
import {auth} from "../../middleware/auth.js"
import {createProduct} from "./product.controller.js";
import fileUpload from '../../utils/multer.js'
import {fileValidation} from '../../utils/multer.js'
const router = Router();

router.post('/create',auth(['Admin']),fileUpload(fileValidation.image).fields([
    {name:"mainImage",maxCount:1},
    {name:"subImages",maxCount:5}
]),createProduct);

export default router