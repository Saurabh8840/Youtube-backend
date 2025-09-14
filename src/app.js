import express from "express"
import cors from "cors"
import cookieParsar from  "cookie-parser"


const app=express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

// app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParsar())

export {app}


import { registerUser } from "controllers/users.controller.js";

app.use('/api/v1/users',registerUser)
