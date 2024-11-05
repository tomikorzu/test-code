import express from "express";

// Controllers
import login from "../controllers/login.js";
import register from "../controllers/register.js";
import changePassword from "../controllers/change-psw.js";

// MiddleWares
import verifyToken from "../middlewares/tokens/verify-token.js";
import userPayload from "../middlewares/tokens/userPayload.js";

// Validations
import validateRegister from "../middlewares/validations/register.js";
import validateLogin from "../middlewares/validations/login.js";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.patch("/change-psw/:id", verifyToken, userPayload, changePassword);

export default router;
