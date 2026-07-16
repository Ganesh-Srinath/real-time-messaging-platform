import pool from "../config/db.js";

export const createMessage = async (
  message
) => {

  const {
    id,
    channelId,
    content,
    userId,
  } = message;

  await pool.query(
    `
    INSERT INTO messages
      (
        id,
        content,
        user_id,
        channel_id
      )
    VALUES
      (?, ?, ?, ?)
    `,
    [
      id,
      content,
      userId,
      channelId,
    ]
  );

};

export const getMessagesByChannelId = async (
  channelId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      m.id,
      m.content,
      m.created_at,
      u.username
    FROM messages m
    JOIN users u
      ON m.user_id = u.id
    WHERE m.channel_id = ?
    ORDER BY m.created_at
    `,
    [channelId]
  );

  return rows;

};

export const getMessageById = async (
  id
) => {

  const [rows] = await pool.query(
    `
    SELECT
      m.id,
      m.content,
      m.created_at,
      m.channel_id,
      u.username,
      u.id AS userId
    FROM messages m
    JOIN users u
      ON m.user_id = u.id
    WHERE m.id = ?
    `,
    [id]
  );

  return rows[0] || null;

};