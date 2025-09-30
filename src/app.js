import express from "express"
import cors from "cors"
import cookieParsar from  "cookie-parser"


const app=express();


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParsar())

export {app}

import userRouter from "./routes/user.routes.js";
import healthCheckRouter from "./routes/healthCheck.route.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import videosRouter from "./routes/videoRouter.js"

//routes declarartion 
app.use("/api/v1/healthCheck",healthCheckRouter)
app.use("/api/v1/users",userRouter)
app.use("/api/v1/tweets",tweetRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/videos",videoRouter)