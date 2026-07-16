import {
  createChannelService,
  getChannelsService,
} from "../services/channelsService.js";

export const createChannel = async (
  req,
  res
) => {

  try {

    const channel =
      await createChannelService({
        name: req.body.name,
        serverId: req.params.serverId,
      });

    return res.status(201).json(
      channel
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

export const getChannels = async (
  req,
  res
) => {

  try {

    const channels =
      await getChannelsService(
        req.params.serverId
      );

    return res.status(200).json(
      channels
    );

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};