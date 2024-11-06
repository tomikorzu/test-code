import db from "../../config/db/users-db.js";
import bcrypt from "bcrypt";

const searchEmail = (value) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT email FROM users WHERE email = ?`, [value], (err, user) => {
      if (err) {
        reject({ message: "There was an error server", code: 500 });
      }

      if (!user) {
        reject({ message: "User not found", code: 404 });
      }

      resolve(true);
    });
  });
};

const searchPassword = (value, req) => {
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
};

export default { searchEmail, searchPassword };
