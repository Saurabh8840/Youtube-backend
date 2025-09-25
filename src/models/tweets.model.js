//avatarimage
//fullname
//like
//dislike


import mongoose ,{Schema}from "mongoose";

const TweetSchema= new Schema({
    content:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Tweet =mongoose.model("Tweet",TweetSchema)