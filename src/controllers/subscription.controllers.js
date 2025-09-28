import asyncHandler from "../utils/asynchandler.js"

const getSubscribedChannels=asyncHandler(async(req,res)=>{
    
    const {subscribedId}=req.params;

    if(!subscribedId){
        throw new ApiError(400,"need subcriber id")
    }

    const subscriberCount=await Subscription.countDocuments({subscriber:subscriberId});

    if(!subcriberCount){
        throw new ApiError(400,"error while counting subscriber")
    }

    return res
        .status(200)
        .json(new ApiError(200,subscriberCount,,"fetched successfully"))

    
})



const getUserChannelSubscribers=asyncHandler(async(req,res)=>{

    //i have to count subscription 
    
})