import userModel from '../../../DB/models/user.model.js';

export const register = async(req,res,next)=>{
    return res.status(201).json({message:"ok"});
};