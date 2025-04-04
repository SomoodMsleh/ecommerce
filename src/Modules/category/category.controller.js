import userModel from '../../../DB/models/category.model.js';
import slugify from 'slugify';

export const createCategory = (req,res,next)=>{
    const {name} = req.body;
    const slug = slugify(name);
    const userId = req.userId;
    return res.status(201).json({message:"successfully",userId});
};