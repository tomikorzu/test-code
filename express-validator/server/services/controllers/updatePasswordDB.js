import bcrypt from "bcrypt";
import db from "../../config/db/users-db.js";

export const updatePassword = async ( id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id],
      (err) => {
        if (err) {
          reject({ message: "There was an error server", code: 500 });
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
};

