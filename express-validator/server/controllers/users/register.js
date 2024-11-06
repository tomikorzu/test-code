import db from "../../config/db/users-db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import roles from "../../constants/roles.js";
import responses from "../../utils/show-response.js";

const register = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validations = errors.array().map((value) => {
      return value.msg;
    });

    const messages = validations.map((msg) => {
      return msg.message || msg;
    });
    const statusCode = validations.map((msg) => {
      return msg.code || 400;
    });

    if (validations.length > 0) {
      return res.status(statusCode[0]).json({
        message: messages[0],
      });
      // return responses.badRequest(res, validations)
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, email, password, fullname, role) VALUES (?, ?, ?, ?, ?)",
    [username, email, hashedPassword, fullname, roles.student],
    (err) => {
      if (err) {
        return responses.serverError(res);
      }

      responses.created(res, "User registered successfully");
    }
  );
};

export default register;
