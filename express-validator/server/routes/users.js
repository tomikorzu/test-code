import express from "express";

// Middlewares
import verifyUserLogged from "../middlewares/authenticate/verify-user-logged.js";
import userPayload from "../middlewares/authenticate/user-payload.js";

// routes
import register from "../controllers/users/register.js";
import login from "../controllers/users/login.js";
import changePassword from "../controllers/users/change-password.js";

// Validations
import validateRegister from "../middlewares/validations/register.js";
import validateLogin from "../middlewares/validations/login.js";
import validateChangePassword from "../middlewares/validations/changePassword.js";

const router = express.Router();

router.get("/", verifyUserLogged, userPayload, (req, res) => {
  res.status(200).json([]);
});
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.patch(
  "/change-password/:id",
  verifyUserLogged,
  userPayload,
  validateChangePassword,
  changePassword
);

export default router;
