import responses from "../../utils/show-response.js";

import db from "../../config/db/users-db.js";

const getIdByEmail = (res, email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT id FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        responses.serverError(res);
        reject(false);
      } else if (!row) {
        responses.notFound(res, "User not found");
        reject(false);
      } else {
        resolve(row);
      }
    });
  });
};

export default getIdByEmail;
