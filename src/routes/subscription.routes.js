import {Router} from "express"
import { verifyjwt } from "../middlewares/auth.middleware,js";

const router=Router();
app.use(verifyjwt);



