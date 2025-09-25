import {Router} from "express"
import { verifyjwt } from "../middlewares/auth.middleware.js";
import { verify } from "jsonwebtoken";
const router=Router();
 
import { createTweet } from "../controllers/tweets.controllers.js";


 //instead of adding jwt to all route add once

router.use(verifyjwt);
router.route("/").post(createTweet)
router.route("/user/:userId").get(getUserTweet)
router.route("/:tweetId").delete(deleteTweet)
router.route("/:tweetId").put(updateTweet)


//ccreate tweet
//get tweet
//like /unlike tweet
// delete tweet ,reply tweet 

export default router