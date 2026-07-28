import { useEffect, useState } from "react";
import {
  getServers,
  createServer,
  joinServer
} from "../services/serverService";

function ServerSidebar({ selectedServer, setSelectedServer, }) {
  const [servers, setServers] = useState([]);

  async function fetchServers() {
    try {
      const data = await getServers();
      setServers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchServers();
  }, []);

  async function handleJoinServer() {
    const inviteCode = prompt("Enter invite code");

    if (!inviteCode) return;

    try {
      await joinServer(inviteCode);

      fetchServers();

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to join server"
      );
    }
  }

  async function handleCreateServer() {
    const name = prompt("Enter server name");

    if (!name) return;

    try {
      await createServer(name);

      // Refresh the server list
      const server = await createServer(name);

      await fetchServers();

      setSelectedServer(server);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-20 bg-base-200 border-r border-base-300 p-2">

      <button
        className="btn btn-circle btn-primary mb-3"
        onClick={() => {

          const choice = prompt(
            "Type:\n1 - Create Server\n2 - Join Server"
          );

          if (choice === "1") {
            handleCreateServer();
          } else if (choice === "2") {
            handleJoinServer();
          }

        }}
      >
        +
      </button>

      <div className="flex flex-col gap-3">
        {servers.map((server) => (
          <button
            key={server.id}
            className="btn btn-circle"
            onClick={() => setSelectedServer(server)}
          >
            {server.name[0].toUpperCase()}
          </button>
        ))}
      </div>

    </div>
  );
}

export default ServerSidebar;