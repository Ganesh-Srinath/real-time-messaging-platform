import api from "./api";

export async function getMessages(channelId) {

  const response = await api.get(
    `/servers/${channelId}/messages`
  );

  return response.data.messages;
}

export async function sendMessage(
  channelId,
  content
) {

  const response = await api.post(
    `/servers/${channelId}/messages`,
    {
      content,
    }
  );

  return response.data;
}