import { body } from "express-validator";
import db from "../../config/users-db.js";

const validateRegister = [
  body("username")
    .notEmpty()
    .withMessage("Username can not be empty")
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters long")
    .isLength({ max: 20 })
    .withMessage("Username must be at most 20 characters long")
    .isString()
    .withMessage("Username must contain only letters and numbers")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT * FROM users WHERE username = ?`,
          [value],
          (err, user) => {
            if (err) {
              reject(new Error("There was an error server"));
            }

            if (user) {
              reject(new Error("Username is already in use"));
            }

            resolve(true);
          }
        );
      });
    }),
  body("email")
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM users WHERE email = ?", [value], (err, user) => {
          if (err) {
            reject(new Error("Database error"));
          }

          if (user) {
            reject(new Error("Email is already in use"));
          }

          resolve(true);
        });
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("fullname")
    .notEmpty()
    .withMessage("Fullname can not be empty")
    .isLength({ min: 4 })
    .withMessage("Fullname must be at least 4 characters long")
    .isLength({ max: 50 })
    .withMessage("Fullname must be at most 50 characters long"),
];

export default validateRegister;
