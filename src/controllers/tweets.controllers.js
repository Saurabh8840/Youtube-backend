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

export {
    createTweet
}