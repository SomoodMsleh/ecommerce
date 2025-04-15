import couponModel from '../../../DB/models/coupon.model.js';
import { AppError } from "../../utils/AppError.js";


export const createCoupon = async (req,res,next)=>{

    if(await couponModel.findOne({name:req.body.name})){
        return next(new AppError("coupon name is already exists",409));
    }
    req.body.createdBy = req.userId;
    req.body.updateBy = req.userId;
    req.body.expireDate = new Date(req.body.expireDate);
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({message:"successfully",coupon});
}

export const getCoupon = async (req,res,next)=>{
    const coupons = await couponModel.find().select(['name','amount','expireDate']);
    return res.status(200).json({message:"successfully",coupons});
}