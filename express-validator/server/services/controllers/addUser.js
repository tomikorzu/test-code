import db from "../../config/db/users-db.js";
import roles from "../../constants/roles.js";

import responses from "../../utils/show-response.js";

const addUser = (res, username, email, hashedPassword, fullname) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password, fullname, role) VALUES (?,?,?,?,?)`,
      [username, email, hashedPassword, fullname, roles.student],
      (err) => {
        if (err) {
          responses.serverError(res);
          reject(false);
        }
        resolve(true);
      }
    );
  });
};

export default addUser;
