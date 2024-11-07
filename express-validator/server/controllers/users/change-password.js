import responses from "../../utils/show-response.js";

import { updatePassword } from "../../services/controllers/updatePasswordDB.js";

import showErrors from "../../middlewares/validations/errorValidations.js";

const changePassword = async (req, res) => {
  const { newPassword } = req.body;

  const id = req.params.id;

  if (showErrors(req, res)) return;

  const result = await updatePassword(id, newPassword);

  if (result) {
    return responses.success(res, "Password changed successful", id);
  }
};

export default changePassword;
