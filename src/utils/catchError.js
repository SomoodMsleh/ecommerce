export const asyncHandler = (fun)=>{
    return async (req,res,next)=>{
        try{
            return await fun(req,res,next);
        }
        catch(error){
            return res.status(500).json({massage:"server error",error:error.stack});
        }
    };
};