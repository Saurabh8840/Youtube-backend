import { ApiError } from "../utils/ApiError.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import User from "../models/users.model.js"
import { cover } from "three/src/extras/TextureUtils.js"
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { JsonWebTokenError } from "jsonwebtoken";

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



const logoutUser=asyncHandler(async(req,res)=>{
      
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        }
    )

    const options={
        httpsOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))




})

//till now we have created register user, login user, logout user,
//now it time to create route for refresh token when accesstoken expires 
//we need refresh token 



const refreshAccessToken=asyncHandler(async(req,res)=>{

    //summary of this controller
    //target :- check refreshtoken , issues a new accesstoken ,
    
    //read the refreshToken(cookies Or header)
    //verify it (check jwt signature &expirt)
    //match it with db is you store token in db
    //if valid issue a new accessToken 
    //send it back in cookie/response


    
     //read the refresh token
        const token=await req.cookies?.refreshToken || req.body.refreshToken;
    
        if(!token){
            throw new ApiError(401,"unauthorized request");
    
        }
    
    try {
       
    
        //verify token(check jwt )
        const verifyToken=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);
      
        const user=await User.findById(verifyToken._id);
    
        if(!user){
            throw new ApiError(401,"In valid refresh Token")
    
        }
        //match token inside db 
        if(token!==user?.refreshToken){
            throw new ApiError(401,"refresh token not matched");
        }
        
        //now generate accesstoken and refreshtoken
        const {accessToken,newRefreshToken}=generateAccessAndRefreshToken(user._id);
        
        const option={
            httpsOnly:true,
            secure:true
        }
    
        return res
          .status(200)
          .cookies("refreshToken",newRefreshToken,option)
          .cookies("accessToken",accessToken,option)
          .json(
             new ApiError(
                      200,
                      {accessToken,refreshToken:newRefreshToken},
                      "access token refreshed"
                      
            )
          )
    } catch (error) {
        throw new ApiError(401,error?.message||"Invalid refresh Token")
    }

})





export {registerUser ,
    loginUser,
    logoutUser,
    refreshAccessToken
}