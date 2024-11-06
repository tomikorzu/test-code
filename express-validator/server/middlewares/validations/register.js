import { body } from "express-validator";
import db from "../../config/db/users-db.js";

const validateRegister = [
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers")
    .isLength({ min: 4, max: 20 })
    .withMessage("Username must be between 4 and 20 characters")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT username FROM users WHERE username = ?`,
          [value],
          (err, user) => {
            if (err) {
              reject({ message: "There was an error server", code: 500 });
            }

            if (user) {
              reject({ message: "Username is already in use", code: 409 });
            }

            resolve(true);
          }
        );
      });
    }),
  body("email")
    .normalizeEmail()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get(
          "SELECT email FROM users WHERE email = ?",
          [value],
          (err, user) => {
            if (err) {
              reject({ message: "There was an error server", code: 500 });
            }

            if (user) {
              reject({ message: "Email is already in use", code: 409 });
            }

            resolve(true);
          }
        );
      });
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 40 })
    .withMessage("Password must be between 8 and 30 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#\$%\^&\*]/)
    .withMessage(
      "Password must contain at least one special character (!@#$%^&*)"
    ),
  body("fullname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Fullname cannot be empty")
    .isLength({ min: 4, max: 50 })
    .withMessage("Fullname must be between 4 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Fullname must only contain letters and spaces"),
];

export default validateRegister;
