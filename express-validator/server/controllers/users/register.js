import bcrypt from "bcrypt";

import showErrors from "../../middlewares/validations/errorValidations.js";
import responses from "../../utils/show-response.js";
import addUser from "../../services/controllers/addUser.js";

const register = async (req, res) => {
  const { username, email, password, fullname } = req.body;

  if (showErrors(req, res)) return;

  const hashedPassword = await bcrypt.hash(password, 10);

  addUser(res, username, email, hashedPassword, fullname);

  responses.created(res, "User registered successfully");
};

export default register;
