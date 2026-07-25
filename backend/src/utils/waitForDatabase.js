import pool from "../config/db.js";

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

export default async function waitForDatabase(
  retries = 10,
  delay = 3000
) {
  for (let i = 1; i <= retries; i++) {
    try {
      const connection =
        await pool.getConnection();

      connection.release();

      console.log(
        "Database connected"
      );

      return;
    } catch (error) {
      console.log(
        `Database not ready... Retry ${i}/${retries}`
      );

      await sleep(delay);
    }
  }

  throw new Error(
    "Could not connect to MySQL."
  );
}