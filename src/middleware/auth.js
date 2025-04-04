import userModel from '../../DB/models/user.model.js'
import jwt from 'jsonwebtoken';

export const auth = (accessRoles = [] ) => {
    return async (req,res,next)=>{
        const {token} = req.headers;
        if(!token){
            return res.status(400).json({message:"Invalid auth"});
        }
        const decoded = jwt.verify(token,process.env.LOGIN_SIGNAL);
        const user = await userModel.findById(decoded._id);
        if(!accessRoles.includes(user.role)){
            return res.status(400).json({message:"Invalid auth user"});
        }
        req.userId = decoded._id;
        next();
    };
};