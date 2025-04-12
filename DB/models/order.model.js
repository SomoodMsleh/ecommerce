import mongoose, { Schema,Types,model } from "mongoose";

const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[
        {
            productName:{
                type:String, 
                required:true,
            },
            productId:{
                type:Types.ObjectId,
                ref:'Product',
                required:true,
            },
            quantity:{
                type:Number,
                default:1,
                required:true,
            },
            unitPrice:{
                type:Number,
                required:true,
            },
            finalPrice:{
                type:Number,
                required:true,
            }
        }
    ],
    couponName:{
        type:String
    },
    finalPrice:{
        type:Number,
        required:true,
    },
    paymentType:{
        type:String,
        default:"cash",
        enum:["cash","card"],
    },
    status:{
        type:String,
        default:"pending",
        enum:["pending","cancelled","confirmed","onWay","delivered"],
    },
    note:{
        type:String,
    },
    reasonRejected:{
        type:String
    },
    updateBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }

},{timestamps:true});

const orderModel = mongoose.models.Order || model('Order',orderSchema);
export default orderModel;