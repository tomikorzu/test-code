import express from "express";
import { body } from "express-validator";

import login from "../auth/login.js";
import register from "../auth/register.js";
import changePassword from "../auth/change-psw.js";

import verifyToken from "../middlewares/verify-token.js";
import userPayload from "../middlewares/userPayload.js";

const router = express.Router();

router.post("/login", login);
router.post(
  "/register",
  [
    body("username", "Set your username").exists().isLength({ min: 4 }),
    body("email", "Set your email").exists().isEmail(),
    body("password", "Set your password").exists().isLength({ min: 8 }),
    body("fullname", "Set your fullname")
      .exists()
      .isLength({ min: 4 })
      .isString(),
  ],
  register
);
router.patch("/change-psw/:id", verifyToken, userPayload, changePassword);

export default router;
