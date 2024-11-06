import db from "../../config/db/users-db.js";
import bcrypt from "bcrypt";

import responses from "../../utils/show-response.js";

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const id = req.params.id;

  const result = await isValidPassword(req, res, id, oldPassword, newPassword);

  if (result) {
    const isPasswordChanged = await applyChange(req, res, id, newPassword);

    if (isPasswordChanged) {
      return responses.success(res, "Password changed successful", id);
    } else {
      return;
    }
  }
};

async function isValidPassword(req, res, id, oldPassword, newPassword) {
  if (!oldPassword || !newPassword) {
    return responses.badRequest(res, "All the fields must be completed");
  }

  if (!/^.{8,}$/.test(newPassword)) {
    return responses.badRequest(
      res,
      "The new password must be at least 8 characters"
    );
  }
  if (!/^(?=.*[A-Z]).+$/.test(newPassword)) {
    return responses.badRequest(
      res,
      "The new password must contain at least one uppercase letter"
    );
  }
  if (!/^\S+$/.test(newPassword)) {
    return responses.badRequest(res, "The new password cannot contain spaces");
  }

  return new Promise((resolve) => {
    db.get(`SELECT password FROM users WHERE id = ?`, id, async (err, row) => {
      if (err) {
        responses.serverError(res);
        return resolve(false);
      }

      if (!row) {
        responses.notFound(res, "User not found");
        return resolve(false);
      }

      bcrypt.compare(oldPassword, row.password, (err, result) => {
        if (err) {
          responses.serverError(res);
          return resolve(false);
        }

        if (!result) {
          responses.unauthorized(res, "Password not match");
          return resolve(false);
        }

        bcrypt.compare(oldPassword, newPassword, (err) => {
          if (err) {
            responses.serverError(res);
            return resolve(false);
          }

          if (oldPassword === newPassword) {
            responses.conflict(res, "The new password can not be the same");
            return resolve(false);
          }

          resolve(true);
        });
      });
    });
  });
}

async function applyChange(req, res, id, newPassword) {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  return new Promise((resolve) => {
    db.run(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, id],
      (err) => {
        if (err) {
          responses.serverError(res);
          return resolve(false);
        }
        resolve(true);
      }
    );
  });
}

export default changePassword;
