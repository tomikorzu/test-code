import jwt from "jsonwebtoken";

import responses from "../../utils/show-response.js";

const secretKey = process.env.SECRET_KEY;

const verifyUserLogged = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return responses.badRequest(res, "You are not logged");
  }

  const onlyToken = token.split(" ")[1];

  jwt.verify(onlyToken, secretKey, (err, decoded) => {
    if (err) {
      return responses.unauthorized(res, "Invalid token");
    }
    req.user = decoded;
    next();
  });
};

export default verifyUserLogged;
