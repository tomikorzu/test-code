import jwt from "jsonwebtoken";

import responses from "../../utils/show-response.js";
import showErrors from "../../middlewares/validations/errorValidations.js";

import getIdByEmail from "../../services/controllers/getIdByEmail.js";

const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
  const { email } = req.body;

  if (showErrors(req, res)) return;

  const result = await getIdByEmail(res, email);

  const token = jwt.sign({ email, id: result }, secretKey);

  responses.success(res, "Login successful", { token, id: result });
};

export default login;
