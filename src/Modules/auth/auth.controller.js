import userModel from '../../../DB/models/user.model.js';
import bcrypt, { hash } from 'bcryptjs';

export const register = async(req,res,next)=>{
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email:email});
    if(user){
        return res.status(400).json({message:"email already exist"});
    }
    const hash = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));
    const createUser = await userModel.create({userName,email,password:hash});
    return res.status(201).json({message:"ok",createUser});
    
};