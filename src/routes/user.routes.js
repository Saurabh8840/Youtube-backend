import {Router} from "express"
import { upload } from "../middlewares/multer.middleware";

const router=Router();

router.route('/login').post(
    
    upload.fields([
        {
            name:'avatar',maxCount:1
        },
        {
            name:'coverimage',maxcount:1
        }
    ]),
   
    loginUser
)


 export default router;