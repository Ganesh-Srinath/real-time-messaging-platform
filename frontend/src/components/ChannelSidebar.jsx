import { useEffect, useState } from "react";
import {
  getChannels,
  createChannel,
} from "../services/channelService";

function ChannelSidebar({ selectedServer, selectedChannel, setSelectedChannel, }) {

  const [channels, setChannels] =
    useState([]);

  async function fetchChannels() {

    if (!selectedServer) return;

    try {

      const data =
        await getChannels(
          selectedServer.id
        );

      setChannels(data);

    } catch (error) {

      console.error(error);

    }

  }

  useEffect(() => {

    fetchChannels();

  }, [selectedServer]);

  async function handleCreateChannel() {

    if (!selectedServer) return;

    const name =
      prompt("Channel name");

    if (!name) return;

    try {

      await createChannel(
        selectedServer.id,
        name
      );

      fetchChannels();

    } catch (error) {

      console.error(error);

    }

  }

  return (
    <div className="w-64 bg-base-200 border-r border-base-300 p-4">

      <div className="flex justify-between items-center mb-4">

        <h2 className="font-bold text-lg">
          Channels
        </h2>

        <button
          className="btn btn-sm btn-primary"
          onClick={handleCreateChannel}
        >
          +
        </button>

      </div>

      <div className="menu">

        {channels.map((channel) => (

          <li key={channel.id}>

            <a
              onClick={() =>
                setSelectedChannel(channel)
              }
            >
              # {channel.name}
            </a>

          </li>

        ))}

      </div>

    </div>
  );
}

export default ChannelSidebar;