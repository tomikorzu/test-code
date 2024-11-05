import db from "../config/users-db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

import logger from "../config/logger.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validations = errors.array().map((value) => {
      return value.msg;
    });

    let firstValidation = validations[0];

    if (validations.length > 0) {
      return res.status(400).json({
        message: validations,
      });
    }
  }

  const id = db.get(
    `SELECT id from users WHERE email = ?`,
    [email],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      return row;
    }
  );
  const token = jwt.sign({ email, id }, secretKey);

  res.status(200).json({ message: "Login successful", token, id });
};

export default login;
