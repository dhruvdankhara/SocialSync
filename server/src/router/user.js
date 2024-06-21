import { Router } from "express";

import { registerUser } from "../controller/user.controller.js";
import { validateUserRegistration } from "../middleware/userValidation.middleware.js";

const router = Router();

router.route("/register").post(validateUserRegistration, registerUser);

export default router;
