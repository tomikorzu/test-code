import db from "../config/users-db.js";
import bcrypt from "bcrypt";

import roles from "../constants/roles.js";

const register = (req, res) => {
  const { username, email, password, fullname } = req.body;

  if ((!username, !email, !password, !fullname)) {
    return res.status(400).json({ error: "All fields are required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ? or username = ?",
    [email, username],
    (err, existingUser) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (existingUser) {
        return res
          .status(409)
          .json({ error: "Email or username are already in use" });
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
    }
  );
};

export default register;
