import mongoose from "mongoose";
import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema ({

    message:{
        type: String,
        required:true,
    },
    senderId:{
        type:String,
        required:true,
    },
    reciverId:{
        type:String,
        required:true,
    },
    orderIdx:{
        type:Number,
        required:true,
    }
},  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);
export {Chat};
