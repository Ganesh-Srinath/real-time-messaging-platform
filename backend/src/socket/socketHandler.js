import { sendMessageService } from "../services/messageService.js";
import { validateChannelAccess } from "../services/channelsService.js";

export const registerSocketHandlers = (io) => {

  io.on("connection", (socket) => {

    console.log(
      `User ${socket.userId} connected`
    );

    socket.on(
      "joinRoom",
      async (channelId) => {

        try {

          await validateChannelAccess(
            channelId,
            socket.userId
          );

          socket.join(channelId);

        } catch (error) {

          socket.emit(
            "messageError",
            {
              message: error.message,
            }
          );

        }

      }
    );

    socket.on(
      "sendMessage",
      async (data) => {

        try {

          await validateChannelAccess(
            data.channelId,
            socket.userId
          );

          const message =
            await sendMessageService({
              channelId: data.channelId,
              content: data.content,
              userId: socket.userId,
            });

          io.to(data.channelId).emit(
            "newMessage",
            message
          );

        } catch (error) {

          socket.emit(
            "messageError",
            {
              message: error.message,
            }
          );

        }

      }
    );

    socket.on(
      "disconnect",
      () => {

        console.log(
          `User ${socket.userId} disconnected`
        );

      }
    );

  });

};