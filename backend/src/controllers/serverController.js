import {
  createServerService,
  getMyServers,
  joinServerService,
} from "../services/serverService.js";

export const createServer = async (
  req,
  res
) => {

  try {

    const server =
      await createServerService({
        name: req.body.name,
        ownerId: req.user.userId,
      });

    return res.status(201).json(
      server
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

export const getServers = async (
  req,
  res
) => {

  try {

    const servers =
      await getMyServers(
        req.user.userId
      );

    return res.status(200).json(
      servers
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

export const joinServer = async (
  req,
  res
) => {

  try {

    const server =
      await joinServerService({
        inviteCode: req.body.inviteCode,
        userId: req.user.userId,
      });

    return res.status(200).json(
      server
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};