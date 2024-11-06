import { statusCodes, messages } from "../constants/responses.js";

const created = (res, msg, data) => {
  return res.status(statusCodes.CREATED).json({ message: msg, data });
};

const success = (res, msg, data) => {
  return res.status(statusCodes.SUCCESS).json({ message: msg, data });
};

const badRequest = (res, msg) => {
  return res.status(statusCodes.BAD_REQUEST).json({ message: msg });
};

const unauthorized = (res, msg) => {
  return res.status(statusCodes.UNAUTHORIZED).json({ message: msg });
};

const forbidden = (res, msg) => {
  return res.status(statusCodes.FORBIDDEN).json({ message: msg });
};

const notFound = (res, msg) => {
  return res.status(statusCodes.NOT_FOUND).json({ message: msg });
};

const conflict = (res, msg) => {
  return res.status(statusCodes.CONFLICT).json({ message: msg });
};

const serverError = (res) => {
  return res
    .status(statusCodes.SERVER_ERROR)
    .json({ message: messages.SERVER_ERROR });
};

export default {
  created,
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  serverError,
};
