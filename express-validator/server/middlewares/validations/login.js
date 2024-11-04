import db from "../../config/users-db.js";
import bcrypt from "bcrypt";
import { body } from "express-validator";

const validateLogin = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .custom((value) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT email FROM users WHERE email = ?`,
          [value],
          (err, user) => {
            if (err) {
              reject(new Error("There was an error server"));
            }

            if (!user) {
              reject(new Error("User not found"));
            }

            resolve(true);
          }
        );
      });
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        db.get(
          `SELECT password FROM users WHERE email = ?`,
          [req.body.email],
          (err, row) => {
            if (err) {
              reject(new Error("There was an error server"));
            }
            bcrypt.compare(value, row.password, (err, result) => {
              if (err) {
                reject(new Error("Internal server error"));
              }

              if (!result) {
                reject(new Error("Incorrect password"));
              }

              resolve(true);
            });
          }
        );
      });
    }),
];

export default validateLogin;
