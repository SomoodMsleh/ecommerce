import  {mongoose, Schema,Types,model } from "mongoose";


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
        }
    ],
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true,
    },
    colors:[String],
    sizes:[String],
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
},{timestamps:true});

const productModel = mongoose.models.Product || model('Product',productSchema);
export default productModel;