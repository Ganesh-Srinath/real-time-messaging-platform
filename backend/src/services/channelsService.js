import { v4 as uuid } from "uuid";
import {
  createChannel,
  getChannelsByServerId,
  canAccessChannel,
} from "../models/channelsModel.js";

export const createChannelService = async (
  channelData
) => {

  const {
    name,
    serverId,
  } = channelData;

  const channel = {
    id: uuid(),
    name,
    serverId,
  };

  await createChannel(channel);

  return channel;

};

export const getChannelsService = async (
  serverId
) => {

  return getChannelsByServerId(
    serverId
  );

};

export const validateChannelAccess = async (
  channelId,
  userId
) => {

  const allowed =
    await canAccessChannel(
      channelId,
      userId
    );

  if (!allowed) {
    throw new Error(
      "Access denied"
    );
  }

};