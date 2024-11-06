import { validationResult } from "express-validator";
import responses from "../../utils/show-response.js";

import { updatePassword } from "../../services/controllers/updatePasswordDB.js";
import { getPassword } from "../../services/validations/getPasswordDB.js";

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const id = req.params.id;

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

  const isPasswordChanged = await updatePassword( id, newPassword);

  if (isPasswordChanged) {
    return responses.success(res, "Password changed successful", id);
  } else {
    return;
  }
};

export default changePassword;
