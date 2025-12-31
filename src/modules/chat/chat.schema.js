import mongoose from "mongoose";
import mongoose, {Schema} from "mongoose";

const chatSchema = new Schema ({

    message:{
        type: String,
        required:true,
    },
    objectId:{
        senderId:{
            type:String,
            required:true,
        },
        reciverId:{
            type:String,
            required:true,
        },
    },
    order_idN:{
        type:Number,
        required:true,
    },
    timeStamp:{
        type: Date,
        default : Date.now()
    }

});

const Chat = mongoose.model("Chat", chatSchema);
export {Chat};