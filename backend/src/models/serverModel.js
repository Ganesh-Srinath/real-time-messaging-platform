import pool from "../config/db.js";

export const createServer = async (
  connection,
  server
) => {

  const {
    id,
    name,
    ownerId,
    inviteCode,
  } = server;

  await connection.query(
    `
    INSERT INTO servers
      (
        id,
        name,
        owner_id,
        invite_code
      )
    VALUES
      (?, ?, ?, ?)
    `,
    [
      id,
      name,
      ownerId,
      inviteCode,
    ]
  );

};

export const addMember = async (
  serverId,
  userId,
  connection = pool
) => {

  await connection.query(
    `
    INSERT INTO server_members
      (
        server_id,
        user_id
      )
    VALUES
      (?, ?)
    `,
    [
      serverId,
      userId,
    ]
  );

};

export const getServersByUserId = async (
  userId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      s.id,
      s.name,
      s.owner_id,
      s.invite_code,
      s.created_at
    FROM servers s
    JOIN server_members sm
      ON s.id = sm.server_id
    WHERE sm.user_id = ?
    `,
    [userId]
  );

  return rows;

};

export const findServerByInviteCode = async (
  inviteCode
) => {

  const [rows] = await pool.query(
    `
    SELECT
      id,
      name,
      owner_id,
      invite_code,
      created_at
    FROM servers
    WHERE invite_code = ?
    `,
    [inviteCode]
  );

  return rows[0] || null;

};

export const findServerMember = async (
  serverId,
  userId
) => {

  const [rows] = await pool.query(
    `
    SELECT
      server_id,
      user_id
    FROM server_members
    WHERE server_id = ?
      AND user_id = ?
    `,
    [
      serverId,
      userId,
    ]
  );

  return rows[0] || null;

};