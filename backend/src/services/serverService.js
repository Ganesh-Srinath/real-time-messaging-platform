import { v4 as uuid } from "uuid";
import pool from "../config/db.js";
import {
  createServer,
  addMember,
  getServersByUserId,
  findServerByInviteCode,
  findServerMember,
} from "../models/serverModel.js";

export const createServerService = async (
  serverData
) => {

  const connection =
    await pool.getConnection();

  try {

    await connection.beginTransaction();

    const {
      name,
      ownerId,
    } = serverData;

    const server = {
      id: uuid(),
      name,
      ownerId,
      inviteCode: uuid()
        .replace(/-/g, "")
        .substring(0, 6)
        .toUpperCase(),
    };

    await createServer(
      connection,
      server
    );

    await addMember(
      server.id,
      server.ownerId,
      connection
    );

    await connection.commit();

    return server;

  } catch (error) {

    await connection.rollback();
    throw error;

  } finally {

    connection.release();

  }

};

export const getMyServers = async (
  userId
) => {

  return getServersByUserId(
    userId
  );

};

export const joinServerService = async (
  joinData
) => {

  const {
    inviteCode,
    userId,
  } = joinData;

  const server =
    await findServerByInviteCode(
      inviteCode
    );

  if (!server) {
    throw new Error(
      "Invalid invite code"
    );
  }

  const existingMember =
    await findServerMember(
      server.id,
      userId
    );

  if (existingMember) {
    throw new Error(
      "You are already a member of this server"
    );
  }

  await addMember(
    server.id,
    userId
  );

  return server;

};