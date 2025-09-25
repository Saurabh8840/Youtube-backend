import { ApiResponse } from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler.js";

export const healthCheck=asyncHandler(async(req,res)=>{
    //build a healthcheck response that simply return  the okk stautus as json with a message
    
    return res
       .status(200)
       .json(
        new ApiResponse(200,{},"everything is fine")
       )
})