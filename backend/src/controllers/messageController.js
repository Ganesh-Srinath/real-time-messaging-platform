import {
  sendMessageService,
  getMessagesService,
} from "../services/messageService.js";

export const sendMessage = async (
  req,
  res
) => {

  try {

    const message =
      await sendMessageService({
        channelId: req.params.channelId,
        content: req.body.content,
        userId: req.user.userId,
      });

    return res.status(201).json(
      message
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

export const getMessages = async (
  req,
  res
) => {

  try {

    const messages =
      await getMessagesService(
        req.params.channelId
      );

    return res.status(200).json({
      messages,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};