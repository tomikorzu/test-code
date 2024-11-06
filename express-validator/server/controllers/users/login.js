import db from "../../config/db/users-db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { validationResult } from "express-validator";

import responses from "../../utils/show-response.js";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const login = (req, res) => {
  const { email, password } = req.body;

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

  db.get(`SELECT id from users WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return responses.serverError(res);
    }

    const token = jwt.sign({ email, id: row.id }, secretKey);

    responses.success(res, "Login successful", { token, id: row.id });
  });
};

export default login;
