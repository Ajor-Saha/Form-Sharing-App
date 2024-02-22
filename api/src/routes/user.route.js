import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";


const router = Router()

router.route("/signup").post(registerUser)

router.route("/signin").post(loginUser)

// secured routes
router.route("/signout").post(verifyJWT,logoutUser)


export default router