import mongoose, { Schema,Types,model } from "mongoose";

const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    expireDate:{
        type:Date,
        required:true,
    },
    usedBy:[  
        {
            type:Types.ObjectId,
            ref:'User'
        }
    ],
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    updateBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps:true,
});

const couponModel = mongoose.models.Coupon || model('Coupon',couponSchema);
export default couponModel;

