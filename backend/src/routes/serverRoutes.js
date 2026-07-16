import express from "express";

import {
  createServer,
  getServers,
  joinServer,
} from "../controllers/serverController.js";

import {
  createChannel,
  getChannels,
} from "../controllers/channelsController.js";

import {
  sendMessage,
  getMessages,
} from "../controllers/messageController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Server routes

router.post(
  "/",
  authMiddleware,
  createServer
);

router.get(
  "/",
  authMiddleware,
  getServers
);

router.post(
  "/join",
  authMiddleware,
  joinServer
);

// Channel routes

router.post(
  "/:serverId/channels",
  authMiddleware,
  createChannel
);

router.get(
  "/:serverId/channels",
  authMiddleware,
  getChannels
);

// Message routes

router.post(
  "/:channelId/messages",
  authMiddleware,
  sendMessage
);

router.get(
  "/:channelId/messages",
  authMiddleware,
  getMessages
);

export default router;