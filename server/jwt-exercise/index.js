import express from "express";
import dotenv from "dotenv";

import userRoutes from "./server/routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
