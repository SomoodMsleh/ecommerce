import slugify from 'slugify';
import productModel from '../../../DB/models/product.model.js';
import cloudinary from '../../utils/cloudinary.js';
import categoryModel from '../../../DB/models/category.model.js';
export const createProduct = async(req,res,next)=>{
    
    const {name,categoryId,discount} = req.body;
    const checkCategory =  await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"Category not found"});
    }
    req.body.slug = slugify(name);
    req.body.createdBy = req.userId;
    req.body.updateBy = req.userId; 
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`/${process.env.APP_NAME}/products/${name}`});
    req.body.mainImage = {secure_url,public_id};
    
    if(req.files.subImages){
        req.body.subImages = []
        for (const image of req.files.subImages){
            const {secure_url,public_id} = await cloudinary.uploader.upload(image.path,{folder:`/${process.env.APP_NAME}/products/${name}/subImages`});
            req.body.subImages.push({secure_url,public_id})
        }
    }
    if(!discount){
        req.body.priceAfterDiscount = req.body.price;
    }else{
        req.body.priceAfterDiscount =  req.body.price - (req.body.price * (discount/100));
    }
    const product = await productModel.create(req.body)   
    return res.status(201).json({message:"successfully",product});
};

export const getActiveProduct = async(req,res,next)=>{
    const products = await productModel.find({status:'active'}).select(['name','price','mainImage']);
    return res.status(200).json({message:"successfully",products});

};

export const getAllProduct = async(req,res,next)=>{
    const products = await productModel.find({}).select(['name','price','mainImage']);
    return res.status(200).json({message:"successfully",products});
};


export const getDetailsProduct = async(req,res,next)=>{
    const {id} = req.params;
    const product = await productModel.findById(id).select(['name','price','mainImage','status']);
    if(!product || product.status == 'not_active'){
        return res.status(404).json({message:"product not found"});
    }
    return res.status(200).json({message:"successfully",product});
};





export const deleteProduct = async (req,res,next)=>{
    const {id} = req.params;
    const product = await productModel.findByIdAndDelete(id);
    if(!product){
        return res.status(404).json({message:"product not found"});
    }
    await cloudinary.uploader.destroy(product.mainImage.public_id);
    if(product.subImages){
        for(const image of product.subImages){
            await cloudinary.uploader.destroy(image.public_id);
        }
    }
    return res.status(200).json({message:"successfully",product});
};