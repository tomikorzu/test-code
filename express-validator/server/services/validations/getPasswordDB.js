import bcrypt from "bcrypt";
import db from "../../config/db/users-db.js";

export const getPassword = (id, oldPassword, newPassword) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT password FROM users WHERE id = ?`, id, (err, row) => {
      if (err) {
        reject({ message: "There was an error server", code: 500 });
      } else if (!row) {
        console.log(id);
        
        reject({ message: "User not found", code: 404 });
      } else {
        bcrypt.compare(oldPassword, row.password, (err, result) => {
          if (err) {
            reject({ message: "There was an error server", code: 500 });
          } else if (!result) {
            reject({ message: "Incorrect Password", code: 400 });
          } else {
            bcrypt.compare(oldPassword, newPassword, (err) => {
              if (err) {
                reject({ message: "There was an error server", code: 500 });
              } else if (oldPassword === newPassword) {
                reject({
                  message: "The new password can not be the same",
                  code: 409,
                });
              } else {
                resolve(true);
              }
            });
          }
        });
      }
    });
  });
};
