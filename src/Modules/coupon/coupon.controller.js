import couponModel from '../../../DB/models/coupon.model.js';

export const createCoupon = async (req,res,next)=>{

    if(await couponModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"coupon name is already exists"});
    }
    req.body.createdBy = req.userId;
    req.body.updateBy = req.userId;
    req.body.expireDate = new Date(req.body.expireDate);
    const coupon = await couponModel.create(req.body);
    return res.status(201).json({message:"successfully",coupon});
}