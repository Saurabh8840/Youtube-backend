import {Router} from "express"
import { upload } from "../middlewares/multer.middleware";
import {  loginUser,
         logoutUser,
         refreshAccessToken,
         changeCurrentPassword,
         getCurrentUser,
         updateUserAvatar,
         updateUserCoverImage

 } from "../controllers/users.controller.js";
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
router.route("/change-password").post(verifyjwt,changeCurrentPassword)
router.route("/current-user").post(verifyjwt,getCurrentUser)
router.route("/update-account").patch(verifyjwt,updateAccountDetails)

router.route("/avatar").patch(verifyjwt,upload.single("avatar"),uploadUserAvatar)
router.route("/cover-image").path(verifyjwt,upload.single("coverImage"),updateUserCoverImage)





 export default router;

