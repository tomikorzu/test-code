import db from "../../config/db/users-db.js";

const searchUsername = (value) => {
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
};

const searchEmail = (value) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT email FROM users WHERE email = ?", [value], (err, user) => {
      if (err) {
        reject({ message: "There was an error server", code: 500 });
      }

      if (user) {
        reject({ message: "Email is already in use", code: 409 });
      }

      resolve(true);
    });
  });
};

export default { searchUsername, searchEmail };
