import express from "express";

// Controllers
import login from "../auth/login.js";
import register from "../auth/register.js";
import changePassword from "../auth/change-psw.js";

// MiddleWares
import verifyToken from "../middlewares/verify-token.js";
import userPayload from "../middlewares/userPayload.js";

// Validations
import validateRegister from "../middlewares/validations/register.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);
router.patch("/change-psw/:id", verifyToken, userPayload, changePassword);

export default router;
