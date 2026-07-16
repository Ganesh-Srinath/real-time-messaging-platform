import { v4 as uuid } from "uuid";
import {
  createMessage,
  getMessagesByChannelId,
  getMessageById,
} from "../models/messageModel.js";

export const sendMessageService = async (
  messageData
) => {

  const {
    channelId,
    content,
    userId,
  } = messageData;

  const message = {
    id: uuid(),
    channelId,
    content,
    userId,
  };

  await createMessage(message);

  return getMessageById(
    message.id
  );

};

export const getMessagesService = async (
  channelId
) => {

  return getMessagesByChannelId(
    channelId
  );

};