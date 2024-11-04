import db from "../config/users-db.js";
import bcrypt from "bcrypt";

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const id = req.params.id;

  const result = await isValidPassword(req, res, id, oldPassword, newPassword);

  if (result) {
    const isPswChanged = await changePsw(req, res, id, newPassword);
    if (isPswChanged) {
      return res
        .status(200)
        .json({ message: "Password changed successful", id });
    }
  } else {
    return;
  }
};

async function isValidPassword(req, res, id, oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: "All filed are required" });
  }

  if (oldPassword.length < 6) {
    return res
      .status(400)
      .json({ message: "The password must to have more than 5 characters" });
  }

  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password FROM users WHERE id = ?`,
      [id],
      async (err, row) => {
        if (err) {
          console.error("Error sever:", err);
          res.status(500).json({ message: `Error server` });
          resolve(false);
        }

        if (!row) {
          res.status(404).json({ message: "User not found" });
          resolve(false);
        }

        bcrypt.compare(oldPassword, row.password, (err, result) => {
          if (err) {
            console.error("Error", err);
            res.status(500).json({ message: "Internal server" });
            resolve(false);
          }

          if (!result) {
            res.status(401).json({ message: "Password not match" });
            resolve(false);
          }

          bcrypt.compare(oldPassword, newPassword, (err) => {
            if (err) {
              console.error("Error", err);
              res.status(500).json({ message: "Internal server" });
              resolve(false);
            }

            if (oldPassword === newPassword) {
              res
                .status(409)
                .json({ message: "the passwords cant be the same" });
              resolve(false);
            }
            resolve(true);
          });
        });
      }
    );
  });
}

async function changePsw(req, res, id, newPassword) {
  console.log(newPassword);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id],
      (err) => {
        if (err) {
          console.error("Error updating password:", err);
          res
            .status(500)
            .json({ message: "Server error during password update" });
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
}

export default changePassword;
