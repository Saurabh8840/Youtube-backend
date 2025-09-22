import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import User from "../models/users.model.js"
import { cover } from "three/src/extras/TextureUtils.js"
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

async function generateAccessAndRefreshToken(id){

   try {
     const user=await User.findById(id);
 
     const accessToken=user.generateAccessToken();
     const refreshToken=user.generateRefreshToken();
 
     user.refreshToken=refreshToken;
     await user.save();
 
     return accessToken,refreshToken
   } catch (error) {
      throw new ApiError(500,"Something went wrong while generating refresh token and access token ")
   }

}



const registerUser=asyncHandler(async(req,res)=>{
   
    const {fullName,email,username,password}=req.body

    if([fullName,email,password,username].some((field)=>field?.trim()==="")){
        throw new ApiError(500,"All fields are required")
    }

    

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email or username already existed exists")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"avatar file is required");
    }

    let coverImageLocalPath;
    if(req.files && Array.isArray(Request.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;

    }
    
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage=await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }
     

    const user=await User.create({
       fullName,
       username:username.toLowerCase(),
       email,
       password,
       avatar:avatar.url,
       coverImage:coverImage?.url||"",


    });

    const createdUser=await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while register user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200,createdUser,"User registered successfully "));

    
});

const loginUser=asyncHandler(async(req,res)=>{

    const {username,email,password}=req.body;

    if([email,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"pls enter details ")
    }

    const user=await  User.findOne({
        $or:[{username},{email}]
    });

    if(!user){
        throw new ApiError(404,"user not found ");
    }

    const isPasswordValid=await User.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401,"invalid user credentials")
    }

    const {accessToken,refreshToken}=generateAccessAndRefreshToken();
    
    const loggedInUser=await user.findById(user._id).select("-refreshToken -password ")

    const options={
        httpsOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged In successfully "
        )
    )
})



export {registerUser ,
    loginUser
}