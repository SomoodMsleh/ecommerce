import userModel from '../../../DB/models/user.model.js';
import bcrypt, { hash } from 'bcryptjs';
import {sendEmail} from '../../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import { nanoid ,customAlphabet} from 'nanoid';

export const register = async(req,res,next)=>{
    const {userName,email,password} = req.body;
    const user = await userModel.findOne({email:email});
    if(user){
        return res.status(400).json({message:"email already exist"});
    }
    const hash = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));
    const createUser = await userModel.create({userName,email,password:hash});
    const token = jwt.sign({email},process.env.CONFIRM_EMAIL_SIGN);
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd;">
        <h2 style="color: #333;">Welcome to Tshop!</h2>
        <p style="font-size: 16px;">Hi <strong>${userName}</strong>,</p>
        <p style="font-size: 16px;">Thank you for signing up. Please confirm your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}" 
                style="background-color: #28a745; color: #fff; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px;">
                Confirm Email
            </a>
        </div>
        <p style="font-size: 14px; color: #777;">If you did not create this account, you can ignore this email.</p>
        <p style="font-size: 14px; color: #777;">Best regards,<br><strong>Tshop Team</strong></p>
    </div>`;

    await sendEmail(email,'Confirm Email',html);

    return res.status(201).json({message:"Successfully",createUser});
    
};

export const confirmEmail = async(req,res,next)=>{
    const {token} = req.params;
    const decoded = jwt.verify(token,process.env.CONFIRM_EMAIL_SIGN);
    const email = decoded.email;
    await userModel.findOneAndUpdate({email:email},{confirmEmail:true},{new:true});
    return res.status(200).json({message:"successfully"});
};

export const login = async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Data"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"Plz confirm your email"});
    }
    if(user.status=='not_active'){
        return res.status(400).json({message:"Your account is blocked"});
    }
    const check = bcrypt.compareSync(password,user.password);
    if(!check){
        return res.status(400).json({message:"Invalid Data"});
    }
    const token = jwt.sign({_id:user._id,userName:user.userName,email:user.email,role:user.role},process.env.LOGIN_SIGNAL);
    return res.status(200).json({message:"successfully",token});
};


export const sendCode = async(req,res,next)=>{
    const {email} = req.body;
    const code = customAlphabet('0123456789ABCDEFJHIGKLMNOPQRSTUVWXYZ',6)();
    const user = await userModel.findOneAndUpdate({email},{sendCode:code});
    if(!user){
        return res.status(400).json({message:"Invalid Data"});
    }
    const html = `
        <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h2>Reset Your Password</h2>
            <p>Use the following verification code:</p>
            <div style="font-size: 24px; font-weight: bold; color: #2c3e50;">${code}</div>
            <p>This code is valid for the next 10 minutes.</p>
            <p>If you didn't request this, ignore this email.</p>
        </div>
    `;
    await sendEmail(email,"Reset Password",html);

    return res.status(200).json({message:"successfully"});
};

export const resetPassword = async(req,res,next)=>{
    const {email,code,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"Invalid Data, not register account"});
    }
    if(user.sendCode != code){
        return res.status(400).json({message:"Invalid Code"});
    }
    const hash = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));
    user.password = hash;
    user.sendCode = null;
    await user.save();
    return res.status(200).json({message:"successfully"});
};