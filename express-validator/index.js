import express from "express";
import dotenv from "dotenv";

// Routes
import userRoutes from "./server/routes/users.js";

// Loggers
import requestLogger from "./server/middlewares/logger/request-logger.js";
import errorsLogger from "./server/middlewares/logger/errors-logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(requestLogger);
app.use(errorsLogger);

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
