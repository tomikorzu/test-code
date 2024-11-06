import logger from "../../config/logger.js";
import responses from "../../utils/show-response.js";

const errorsLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  responses.serverError(res);
};

export default errorsLogger;
