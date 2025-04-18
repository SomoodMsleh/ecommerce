import  {mongoose, Schema,Types,model } from "mongoose";

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:50,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:3,
    },
    image:{
        type:Object,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    gender:{
        type:String,
        enum:['male','Female']
    },
    status:{
        type:String,
        enum:['active','not_active'],
        default:'active'
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    role:{
        type:String,
        enum:['Admin','user'],
        default:'user'
    },
    sendCode:{
        type:String,
        default:null,
        
    }
    
},{timestamps:true});

const userModel = mongoose.models.User|| model('User',userSchema);
export default userModel;