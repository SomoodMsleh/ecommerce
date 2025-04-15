import cartModel from "../../../DB/models/cart.model.js";
import productModel from "../../../DB/models/product.model.js";
import { AppError } from "../../utils/AppError.js";

export const createCart = async (req,res,next)=>{
    const {productId} = req.body;
    const cart = await cartModel.findOne({userId:req.userId});
    if(!cart){
        const newCart =await cartModel.create({userId:req.userId,products:{productId}});
        return res.status(201).json({message:"successfully",newCart});
    }
    for (const product of cart.products){
        if(product.productId == productId){
            return res.status(200).json({message:"product already exists in cart"});
        }
    }
    cart.products.push({productId});
    await cart.save();
    return res.status(200).json({message:"successfully",cart});
};

