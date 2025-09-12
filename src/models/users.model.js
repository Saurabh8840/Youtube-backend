import mongoose, { Schema } from "mongoose"

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
    password:{

    },
    
},{timestamps:true})