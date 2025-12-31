import mongoose from "mongoose";
import mongoose, {Schema} from "mongoose";

const userSchema = new Schema ({

    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    imgage_Url:{
        type:String,
    },
    is_googleUser:{
        type:Boolean,
        default:false,
    }
});

const User = mongoose.model("User",userSchema);
export {User};