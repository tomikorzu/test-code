import winston from "winston";
const { combine, timestamp, json, prettyPrint, errors, colorize } =
  winston.format;

const custom = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "blue",
  },
};

const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    json(),
    prettyPrint(),
    errors({ stack: true }),
    colorize({ all: true })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./express-validator/server/logs/error.log",
      level: "error",
    }),
  ],
});

winston.addColors(custom.colors);

logger.info("Hello world");
logger.error("Error message");

export default logger;
