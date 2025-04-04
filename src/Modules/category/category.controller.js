import categoryModel from '../../../DB/models/category.model.js';
import slugify from 'slugify';

export const createCategory = async (req,res,next)=>{
    const {name} = req.body;
    const slug = slugify(name);
    const createdBy = req.userId;
    const category = await categoryModel.create({name,slug,createdBy})
    return res.status(201).json({message:"successfully",category});
};