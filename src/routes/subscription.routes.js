import {Router} from "express"
import { verifyjwt } from "../middlewares/auth.middleware,js";
import {getSubscribedChannels,
       toggleSubscription,
       getUserChannelSubscribers
}

const router=Router();
app.use(verifyjwt);


///here i have to think about route which 
// i have 3 things 
// 1.toggle subscription (subscribe and unsubscribe)
// 2.get all detail of channel subscribeed by me
// 3.get all details of all subscribe of me


route.route("c/:channelId").get(getSubscribedChannels)
router.route("c/:channelId").get(toggleSubscription);

router.route("/u/:subscribedId").get(getUserChannelSubscribers);

export default router




