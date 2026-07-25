import dotenv from "dotenv";
import waitForDatabase from "./utils/waitForDatabase.js";

dotenv.config();

import http from "http";

import app from "./app.js";
import pool from "./config/db.js";
import { initSocket } from "./socket/socket.js";

import authRouter from "./routes/authRoutes.js";
import serverRouter from "./routes/serverRoutes.js";

app.use("/api/auth", authRouter);
app.use("/api/servers", serverRouter);

const PORT =
  process.env.PORT || 5000;

try {

  await waitForDatabase();

  const server =
    http.createServer(app);

  initSocket(server);

  server.listen(PORT, () => {

    console.log(
      `Server running on port ${PORT}`
    );

  });

} catch (error) {

  console.error(
    "Failed to connect to database"
  );

  console.error(error);

  process.exit(1);

}