import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const userPayload = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Se requiere un token de acceso" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = {
      id: decoded.id,
    };
    if (decoded.id != req.params.id) {
      return res.status(403).json({ message: "Use not authorized" });
    }
    next();
  });
};

export default userPayload;
