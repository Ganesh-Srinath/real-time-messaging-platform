import pool from "../config/db.js";

export const findByEmail = async (email) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      password
    FROM users
    WHERE email = ?
    `,
    [email]
  );

  return rows[0] || null;
};

export const findById = async (userId) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      password
    FROM users
    WHERE id = ?
    `,
    [userId]
  );

  return rows[0] || null;
};

export const findByUsername = async (username) => {
  const [rows] = await pool.query(
    `
    SELECT
      id,
      username,
      email,
      password
    FROM users
    WHERE username = ?
    `,
    [username]
  );

  return rows[0] || null;
};

export const createUser = async (user) => {
  await pool.query(
    `
    INSERT INTO users
      (id, username, email, password)
    VALUES
      (?, ?, ?, ?)
    `,
    [
      user.id,
      user.username,
      user.email,
      user.password,
    ]
  );

  return user;
};