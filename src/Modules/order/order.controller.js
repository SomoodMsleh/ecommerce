import orderModel from "../../../DB/models/order.model.js";
import cartModel from "../../../DB/models/cart.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import productModel from "../../../DB/models/product.model.js"
import userModel from "../../../DB/models/user.model.js"
import { AppError } from "../../utils/AppError.js";

export const createOrder = async (req,res,next)=>{
    const {couponName} = req.body; 
    const cart = await cartModel.findOne({userId:req.userId});
    if(!cart){
        return next(new AppError("Cart not found",404));
    }
    if(couponName){
        const coupon = await couponModel.findOne({name:couponName});
        if(!coupon){
            return next(new AppError("Coupon not found",404));
        }
        if(coupon.expireDate <=  new Date()){
            return next(new AppError("this coupon has expired",400));
        }
        if(coupon.usedBy.includes(req.userId)){
            return next(new AppError("this coupon already used",400));
        }
        req.body.coupon = coupon;
    }else{
        req.body.couponName = '';
    }
    const finalProducts = [];
    let subTotal = 0;
    for(let product of cart.products){
        const checkProduct = await productModel.findOne({_id:product.productId,stock:{$gte:product.quantity}});
        if(!checkProduct){
            return next(new AppError("product quantity not available",400));
        }
        // convert product from BSON to JSON used toObject()
        product = product.toObject();
        product.productName = checkProduct.name;
        product.unitPrice = checkProduct.priceAfterDiscount;
        product.finalPrice = product.unitPrice * product.quantity;
        subTotal += product.finalPrice; 
        finalProducts.push(product);
    }
    const user = await userModel.findById(req.userId);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phone = user.phone;
    }
    req.body.products = finalProducts;
    req.body.userId = req.userId;
    req.body.finalPrice = subTotal - (subTotal* ((req.body.coupon.amount|| 0)/100) );
    const order = await orderModel.create(req.body);
    for(const product of cart.products){
        await productModel.updateOne({_id:product.productId},{$inc:{stock:-product.quantity}})
    }
    if(req.body.coupon){
        await couponModel.updateOne({_id:req.body.coupon._id},{$addToSet:{usedBy:req.userId}})
    }
    await cartModel.updateOne({userId:req.userId},{products:[]})
    return res.status(201).json({message:"successfully",order});

};