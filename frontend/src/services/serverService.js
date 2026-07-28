import api from "./api";

export async function getServers() {
  const response = await api.get("/servers");
  return response.data;
}

export async function createServer(name) {
  const response = await api.post("/servers", {
    name,
  });

  return response.data;
}

export async function joinServer(inviteCode) {
  const response = await api.post("/servers/join", {
    inviteCode,
  });

  return response.data;
}
