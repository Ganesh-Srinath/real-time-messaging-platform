import api from "./api.js";

export async function getChannels(serverId) {
  const response = await api.get(
    `/servers/${serverId}/channels`
  );

  return response.data;
}

export async function createChannel(
  serverId,
  name
) {
  const response = await api.post(
    `/servers/${serverId}/channels`,
    { name }
  );

  return response.data;
}