import logger from "../../config/logger.js";

const errorsLogger = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: "There was a server error" });
};

export default errorsLogger;
