import mongoose, { Schema } from "mongoose"

import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})


import jwt from "jsonwebtoken"

import bcrypt from "bcrypt"

const User=new  Schema({

    username:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        require:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,
        required:true,

    },
    coverImage:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:[true,'Password is required']
        
    },
    refreshToken:{
        type:String
    }
    
},{timestamps:true})


//hashing password 

userSchema.pre("save",async function(){
    
    if(!this.isModified("Password"))return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

//compareing password 
userSchema.methods.isPasswordCorrect=async function(password){

    return await bcrypt.compare(password,this.password)

}


//generate accesstoken 

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
        id:this._id
        },
       
        process.env.ACCESS_TOKEN_SECRET
       ,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    })
}


//generate refreshtoken 

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
        id:this._id
        },
       
        process.env.REFRESH_TOKEN_SECRET
       ,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    })
}
export default User;