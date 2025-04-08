import slugify from 'slugify';
import productModel from '../../../DB/models/product.model.js';
import cloudinary from '../../utils/cloudinary.js';
import categoryModel from '../../../DB/models/category.model.js';
export const createProduct = async(req,res,next)=>{
    
    const {name,categoryId} = req.body;
    const checkCategory =  await categoryModel.findById(categoryId);
    if(!checkCategory){
        return res.status(404).json({message:"Category not found"});
    }
    req.body.slug = slugify(name);
    req.body.createdBy = req.userId;
    req.body.updateBy = req.userId; 
    const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path);
    req.body.mainImage = {secure_url,public_id};
    
    if(req.files.subImages){
        req.body.subImages = []
        for (const image of req.files.subImages){
            const {secure_url,public_id} = await cloudinary.uploader.upload(image.path);
            req.body.subImages.push({secure_url,public_id})
        }
    }
    const product = await productModel.create(req.body)   
    return res.status(201).json({message:"successfully",product});
}