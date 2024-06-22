import { Router } from "express";

import { verifyJWT } from "../../middleware/auth.middleware.js";
import {
  getCurrentUser,
  loginUser,
  registerUser,
} from "../../controller/auth/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
