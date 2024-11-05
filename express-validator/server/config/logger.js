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
  levels: custom.levels,
  format: combine(
    timestamp({ format: "HH:mm:ss" }),
    json(),
    prettyPrint(),
    errors({ stack: true }),
    colorize({ all: true })
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console({
      level: "http",
    }),
    new winston.transports.File({
      filename: "./express-validator/server/logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "./express-validator/server/logs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      filename: "./express-validator/server/logs/all.log",
      level: "http",
    }),
  ],
});

winston.addColors(custom.colors);

export default logger;
