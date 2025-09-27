import mongoose from "mongoose"

const subscriptionSchema=new Schema({
    subscriber:{
        type:Schema.Types.ObjectId, //who is subscribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, //to whom subscriber is subscribing 
        ref:"User"
    }
},{timestamps:true})

export const Subscription=mongoose.model("subscription",subscriptionSchema)
