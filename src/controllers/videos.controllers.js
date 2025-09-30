
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {Videos} from "../models/Videos.models.js"

const getAllVideos=asyncHandler(async()=>{

    const {page=1,limit=10,query,sortBy,sortType,userId}=req.query

    //get all vedios based on query sort pagination
    
    const videos=await Video.findAll();

    if(!videos){
        throw new ApiError(200,"no vedios found")
    }

    return res
       .statu(200)
       .json(new ApiResponse(200,{videos},"videos fetched successfully"))
       
})