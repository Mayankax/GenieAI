import mongoose from "mongoose"

const userchatsSchema=new mongoose.Schema({
    userId:{
        type:String,
        require:true
    },
    chats:[
        {
            _id:{
                type:String,
                require:true
            },
            title:{
                type:String,
                require:true
            },  
            createdAt:{
                type:Date,
                default:Date.now(),
            }, 
        },
    ],
},{timestamps:true});

export default mongoose.models.userchats || mongoose.model("userchats",userchatsSchema)