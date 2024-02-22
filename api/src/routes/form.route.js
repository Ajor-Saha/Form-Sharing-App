import { Router } from "express";
import { createForm, getAllResponses, getFormById, getUserForms, submitForm } from "../controllers/from.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()
router.use(verifyJWT);

router.route("/getAllResponses").get(getAllResponses)
router.route("/createForm").post(createForm)
router.route("/getUserForms").get(getUserForms)
router.route("/:formId").get(getFormById)
router.route("/:formId").post(submitForm)
export default router