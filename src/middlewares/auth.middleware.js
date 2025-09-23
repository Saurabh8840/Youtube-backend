import { ApiError } from "../utils/ApiError.js";
import {User} from "../models/users.model.js"
import jwt from "jsonwebtoken"
import {asyncHandler} from "../utils/asyncHandler.js";

export const verifyjwt=asyncHandler(async(req,res,next)=>{
   
    try {
        const token =req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
    
    
        if(!token){
            throw new ApiError(401,"Uauthorized request")
        }
    
        const decodeToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user= await User.findById(decodeToken?._id).select("-password -refreshtoken");
    
        if(!user){
            throw new ApiError(401,"invalid access token ");
    
        }
    
        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid access token")
    }

})