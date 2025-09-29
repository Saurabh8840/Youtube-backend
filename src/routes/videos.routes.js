import {Router} from "express"
import {verifyjwt} from "../middleware/auth.middleware.js"

const router=Router();

router.use(verifyjwt)

//all videos
router.route("/").get(getAllVideos)

//upload videos
router.route("/").post(
    upload.fields([

        {
            name:"videoFile",
            maxCount:1
        },
        {
            name:"thumbnail",
            maxCount:1
        }
    ]),
    publishVideo);


router.route("/:videoId").get(getVideosById)
router.route("/:videoId").delete(deleteVideos)
router.route("/videoId").patch(uplaod.single("thumbnail"),updateVideo)


router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router;

