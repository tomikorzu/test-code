import jwt from "jsonwebtoken";

import responses from "../../utils/show-response.js";

const secretKey = process.env.SECRET_KEY;

const userPayload = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return responses.badRequest(res, "The access token is required");

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return responses.unauthorized(res, "Invalid Token");

    req.user = {
      id: decoded.id,
    };

    if (decoded.id != req.params.id) {
      return responses.forbidden(res, "User not authorized");
    }

    next();
  });
};

export default userPayload;
