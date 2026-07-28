import { useState } from "react";


import ServerSidebar from "../components/ServerSidebar";
import ChannelSidebar from "../components/ChannelSidebar";
import ChatWindow from "../components/ChatWindow";
import UserPanel from "../components/UserPanel";

function Dashboard() {

  const [selectedServer, setSelectedServer] = useState(null);
  const [selectedChannel, setSelectedChannel] = useState(null);

  console.log(selectedServer);
  return (
    <div className="flex h-screen bg-base-300">

      <ServerSidebar
        selectedServer={selectedServer}
        setSelectedServer={setSelectedServer}
      />

      <ChannelSidebar
        selectedServer={selectedServer}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />

      <ChatWindow
        selectedChannel={selectedChannel}
      />

      <div className="flex flex-col flex-1">

        <ChatWindow />

        <UserPanel />

      </div>

    </div>
  );
}

export default Dashboard;