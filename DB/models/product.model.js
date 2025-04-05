import mongoose, { Schema,Types,model } from "mongoose";

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        min:3,
        max:50
    },
    description:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0,
    },
    slug:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','not_active'],
        default:'active'
    },
    mainImage:{
        type:Object,
        required:true
    },
    subImages:[
        {
            type:Object,
            required:true
        }
    ],
    categoryId:{
        type:Types.ObjectId,
        ref:'Category'
    },
    colors:[String],
    sizes:[String],
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    updateBy:{
        type:Types.ObjectId,
        ref:'User',
    }
},{timestamps:true});

const productModel = mongoose.models.Product || model('Product',productSchema);
export default productModel;