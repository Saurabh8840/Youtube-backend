import asyncHandler from "../utils/asynchandler.js"


const toggleSubscription=asyncHandler(async(req,res)=>{

    const {channelId}=req.params;

    //toggle subscription 

    if(!channelId){
        throw new ApiError(400,"channel Id is required")
    }

    //find user id 
    const userId=req.user._id;



    //now check if existing int table 
    const existingSubscription=await Subscription.findOne({
        channel:channelId,
        subscriber:userId
    })
     
    if(existingSubscription){

        await existingSubscription.deleteOne()

        return res
          .status(200)
          .json(
            new ApiResponse(200,{subscribed:false},"Unsubscribed successfully");

          )
        
    }

    else{

        const newSubscriber=await Subscription.create({
            subscriber:userId,
            channel:channelId
        })

        if(!newSubscriber){
            throw new ApiError(400,"unable to subscribe")
        }

        return res
       .status(201)
       .json(new ApiResponse(201,{subscribed:true},"subscribed successfully"))

    }

    
})



//controller to return subscriber list of a channel
const getUserChannelSubscribers=asyncHandler(async(req,res)=>{

    //i have to count subscription 
    
    
})


const getSubscribedChannels=asyncHandler(async(req,res)=>{
    
    const {subscribedId}=req.params;

    if(!subscribedId){
        throw new ApiError(400,"need subcriber id")
    }

    const subscriberCount=await Subscription.countDocuments({subscriber:subscriberId});

    
    
})



