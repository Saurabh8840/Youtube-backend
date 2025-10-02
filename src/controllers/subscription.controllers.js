import asyncHandler from "../utils/asynchandler.js"


const toggleSubscription=asyncHandler(async(req,res)=>{

    const {channelId}=req.params;

    //toggle subscription 

    // if(!channelId){
    //     throw new ApiError(400,"channel Id is required")
    // }
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

    //i have to count subscriber
    const {channelId}=req.params;

    if(!channelId){
        throw new ApiError(400,"channel id is required")
    }

    // const channelSubscriber=await Subscription.countDocuments({channel:channelId});
    //we need list of user who subscribed so we need .find() 
    
    const subscribers=await Subscription.find({channel:channelId}).populate("subscriber","username email");


    

    return res
      .status(200)
      .json(
        new ApiResponse(200,{count:subscribers.length,subscribers},"Subscribers fetched successfullly")
      )
    
})



//list of channel to which user subscribed
const getSubscribedChannels=asyncHandler(async(req,res)=>{
    
    //i have to subscriber 
    const {subscriberId}=req.params;

    if(!subscriberId){
        throw new ApiError(400,"Subscriber  id is required")
    }


    const subscriptions=await Subscription.find({subscriber:subscriberId}).populate("channel","username email");
    
    //filter data bcz channel contain user info as well 
    const channels=subscriptions.map(sub=>sub.channel);
    
    return res
      .status(200)
      .json(
        new ApiResponse(200,{count:channels.length,channels},"channel fetched successfullly")
      )
    
})



export default {
    toggleSubscription,
    getSubscribedChannels,
    getUserChannelSubscribers
}
