import express from "express";

import login from "../auth/login.js";
import register from "../auth/register.js";
import changePassword from "../auth/change-psw.js";

import verifyToken from "../middlewares/verify-token.js";
import userPayload from "../middlewares/userPayload.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.patch("/change-psw/:id", verifyToken, userPayload, changePassword);

export default router;
