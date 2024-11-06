import db from "../../config/db/users-db.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT email FROM users WHERE email = ?`,
          [value],
          (err, user) => {
            if (err) {
              reject({ message: "There was an error server", code: 500 });
            }

            if (!user) {
              reject({ message: "User not found", code: 404 });
            }

            resolve(true);
          }
        );
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^[a-zA-Z0-9!@#\$%\^&\*]+$/)
    .withMessage("Password contains invalid characters")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT password FROM users WHERE email = ?`,
          [req.body.email],
          (err, row) => {
            if (err) {
              reject({ message: "There was an error server", code: 500 });
            } else if (!row) {
              reject({ message: "User not found", code: 404 });
            } else {
              bcrypt.compare(value, row.password, (err, result) => {
                if (err) {
                  reject({ message: "There was an error server", code: 500 });
                }

                if (!result) {
                  reject({ message: "Incorrect Password", code: 400 });
                }

                resolve(true);
              });
            }
          }
        );
      });
    }),
];

export default validateLogin;
