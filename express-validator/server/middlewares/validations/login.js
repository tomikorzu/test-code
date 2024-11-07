import { body } from "express-validator";

import loginValidDB from "../../services/validations/login-validationsDB.js";

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => loginValidDB.searchEmail(value)),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
    .withMessage("Password contains invalid characters")
    .custom((value, { req }) => loginValidDB.searchPassword(value, req)),
];

export default validateLogin;
