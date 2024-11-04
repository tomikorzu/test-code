import db from "../config/users-db.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import roles from "../constants/roles.js";

const register = (req, res) => {
  const { username, email, password, fullname } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validations = errors.array().map((err) => {
      return {
        param: err.param,
        msg: err.msg,
        location: err.location,
      };
    });

    if (validations.length > 0) {
      return res.status(400).json({
        validations,
      });
    }
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  db.run(
    "INSERT INTO users (username, email, password, fullname, role) VALUES (?, ?, ?, ?, ?)",
    [username, email, hashedPassword, fullname, roles.employee],
    (err) => {
      if (err) {
        return res.status(500).json({ error: "Error registering user" });
      }

      res.status(201).json({ message: "User registered successfully" });
    }
  );
};

export default register;
