import {Router} from "express"
import { upload } from "../middlewares/multer.middleware";
import { registerUser } from "../controllers/users.controller";
import {verifyjwt} from "../middlewares/auth.middleware.js";


const router=Router();

router.route('/register').post(
    upload.fields([
        {
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverimage',
            maxcount:1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyjwt,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);





 export default router;

