import categoryModel from '../../../DB/models/category.model.js';
import slugify from 'slugify';

export const createCategory = async (req,res,next)=>{
    const {name} = req.body;
    req.body.slug = slugify(name);
    req.body.createdBy = req.userId;
    req.body.updateBy = req.userId;
    const category = await categoryModel.create(req.body);
    return res.status(201).json({message:"successfully",category});
};

export const getActiveCategory = async(req,res,next)=>{
    const categories = await categoryModel.find({status:'active'});
    return res.status(201).json({message:"successfully",categories});
};

export const getAllCategory = async(req,res,next)=>{
    const categories = await categoryModel.find({});
    return res.status(201).json({message:"successfully",categories});
};

export const deleteCategory = async(req,res,next)=>{
    const {id} = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    if(!category){
        return res.status(404).json({message:"Category not found"});
    }
    return res.status(201).json({message:"successfully"});

};