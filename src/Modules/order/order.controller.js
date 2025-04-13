import orderModel from "../../../DB/models/order.model.js";
import cartModel from "../../../DB/models/cart.model.js";
import couponModel from "../../../DB/models/coupon.model.js";
import productModel from "../../../DB/models/product.model.js"
import userModel from "../../../DB/models/user.model.js"

export const createOrder = async (req,res)=>{
    const {couponName} = req.body; 
    const cart = await cartModel.findOne({userId:req.userId});
    if(!cart){
        return res.status(404).json({message:"Cart not found"});
    }
    if(couponName){
        const coupon = await couponModel.findOne({name:couponName});
        if(!coupon){
            return res.status(404).json({message:"Coupon not found"});
        }
        if(coupon.expireDate <=  new Date()){
            return res.status(400).json({message:"this coupon has expired"});
        }
        if(coupon.usedBy.includes(req.userId)){
            return res.status(400).json({message:"this coupon already used"});
        }
    }else{
        req.body.couponName = '';
    }
    const finalProducts = [];
    let subTotal = 0;
    for(let product of cart.products){
        const checkProduct = await productModel.findOne({_id:product.productId,stock:{$gte:product.quantity}});
        if(!checkProduct){
            return res.status(400).json({message:"product quantity not available"});
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
    req.body.finalPrice = subTotal;
    const order = await orderModel.create(req.body);
    return res.status(201).json({message:"successfully",order});

};