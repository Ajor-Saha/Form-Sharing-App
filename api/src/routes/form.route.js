import { Router } from "express";
import { createForm, getAllResponses, getFormById, getUserForms, submitForm } from "../controllers/from.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()



router.route("/getAllResponses").get(verifyJWT,getAllResponses)
router.route("/createForm").post(verifyJWT,createForm)
router.route("/getUserForms").get(verifyJWT,getUserForms)
router.route("/:formId").get(getFormById)
router.route("/:formId").post(verifyJWT, submitForm)
export default router