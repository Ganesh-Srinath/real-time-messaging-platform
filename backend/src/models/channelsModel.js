import pool from "../config/db.js";

export const createChannel = async (
  channel
) => {

  const {
    id,
    name,
    serverId,
  } = channel;

  await pool.query(
    `
    INSERT INTO channels
      (
        id,
        name,
        server_id
      )
    VALUES
      (?, ?, ?)
    `,
    [
      id,
      name,
      serverId,
    ]
  );

};

export const getChannelsByServerId = async (
  serverId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      id,
      name,
      server_id,
      created_at
    FROM channels
    WHERE server_id = ?
    ORDER BY created_at
    `,
    [serverId]
  );

  return rows;

};

export const canAccessChannel = async (
  channelId,
  userId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      c.id
    FROM channels c
    JOIN server_members sm
      ON c.server_id = sm.server_id
    WHERE c.id = ?
      AND sm.user_id = ?
    `,
    [
      channelId,
      userId,
    ]
  );

  return rows.length > 0;

};