import {Router} from "express"
import { upload } from "../middlewares/multer.middleware";
import { registerUser } from "../controllers/users.controller";

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
router.route("/logout").post(logoutUser);




 export default router;

