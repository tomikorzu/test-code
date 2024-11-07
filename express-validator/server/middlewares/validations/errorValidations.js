import { validationResult } from "express-validator";
import responses from "../../utils/show-response.js";

const showErrors = (req, res) => {
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
};

export default showErrors;
