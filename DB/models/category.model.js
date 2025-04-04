import mongoose, { Schema,Types,model } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:50
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
    image:{
        type:Object,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:'User',
    },
    updateBy:{
        type:Types.ObjectId,
        ref:'User',
    }
},{timestamps:true});

const categoryModel = mongoose.models.Category || model('Category',categorySchema);
export default categoryModel;