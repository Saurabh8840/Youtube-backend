import { ApiError } from "../utils/ApiError";
import asyncHandler from "../utils/asyncHandler";
import {Tweet}  from "../models/tweets.model.js"
import { ApiResponse } from "../utils/ApiResponse";



const createTweet=asyncHandler(async(req,res)=>{

    //create a  tweet
    //check input 
    //logged in user
    //put data content in db 
    //return tweet

    const {content}=req.body

    if(!content || content.trim() === ""){
        throw new ApiError(400,"enter text to create tweet")
    }
    
    const tweet=await Tweet.create({content,owner:req.user?._id})

    
    
    return res
       .status(201)
       .json(
         new ApiResponse(201,{tweet},"tweet created successfully")
       )
    
})

const getUserTweet=asyncHandler(async(req,res)=>{
     
    const {userId}=req.params;

    if(!userId){
        throw new ApiError(400,"user id is required ");
    }
    //i have to get user my userid
    const tweet=await Tweet.find({owner:userId});

    if(!tweet || tweet.length===0){
        throw new ApiError(400,"tweet not found")

    }

    

    return res
       .status(200)
       .json(new ApiResponse( 
        200,
        tweet,
        "user tweet fetched usccessfullly "
       ))
    

});

const updateTweet=asyncHandler(async(req,res)=>{

    const {tweetId}=req.params;
    const {updatedcontent}=req.body;

    
    if(!tweetId){
        throw new ApiError(401,"tweet not found")
    }

    if(!updatedcontent || updatedcontent.trim()===""){
        throw new ApiError(400,"No input found")
    }

    const tweet=await Tweet.findOneAndUpdate(
        {_id:tweetId,owner:req.user._id},
        {
            $set:{
                content:updatedcontent
            }
        },
        {new :true,runValidators: true }
    )

    if(!tweet){
        throw new ApiError(404,"Tweet not found or you are not the owner ");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
            200,
            tweet,
            "tweet updated successfully"
        )
      );
})

const deleteTweet=asyncHandler(async(req,res)=>{

    const {tweetId}=req.params;

    if(!tweetId){
        throw new ApiError(400,"tweet not found")
    }

    const deletedTweet=await Tweet.deleteOne({_id:tweetId,owner:req.user._id});
    
    if (deletedTweet.deletedCount === 0){
    throw new ApiError(404, "Tweet not found or you are not the owner");
    }
 

    return res
       .status(200)
       .json(
        new ApiResponse(200,{},"tweet deleted successfully")
       )
 })



export {
    createTweet,
    getUserTweet,
    updateTweet,
    deleteTweet
}