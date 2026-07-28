import { useEffect, useState, useRef } from "react";
import socket from "../socket/socket.js";
import {
  getMessages,
} from "../services/messageService";

function ChatWindow({ selectedChannel }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const bottomRef = useRef(null);

  async function fetchMessages() {
    if (!selectedChannel) {
      setMessages([]);
      return;
    }

    try {
      const data = await getMessages(selectedChannel.id);
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);
  useEffect(() => {
    if (!selectedChannel) return;

    socket.emit(
      "joinRoom",
      selectedChannel.id
    );

    console.log(
      "Joined room:",
      selectedChannel.id
    );

  }, [selectedChannel]);

  useEffect(() => {

    function handleNewMessage(message) {

      if (
        message.channel_id !== selectedChannel?.id
      ) {
        return;
      }

      setMessages(prev => [
        ...prev,
        message
      ]);

    }

    socket.on(
      "newMessage",
      handleNewMessage
    );

    return () => {

      socket.off(
        "newMessage",
        handleNewMessage
      );

    };

  }, [selectedChannel]);

  useEffect(() => {
    fetchMessages();
  }, [selectedChannel]);

  async function handleSendMessage() {
    if (!selectedChannel) return;

    if (!content.trim()) return;

    try {
      socket.emit(
        "sendMessage",
        {
          channelId: selectedChannel.id,
          content,
        }
      );

      setContent("");
    } catch (error) {
      console.error(error);
    }
  }

  if (!selectedChannel) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <h2 className="text-xl text-gray-500">
          Select a channel
        </h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">

      {/* Header */}
      <div className="p-4 border-b border-base-300">
        <h2 className="font-bold text-lg">
          # {selectedChannel.name}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">

        {messages.length === 0 ? (
          <p className="text-gray-500">
            No messages yet.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className="mb-4"
            >
              <div className="font-semibold">
                {message.username}
              </div>

              <div className="bg-base-200 rounded-lg p-3 mt-1">
                {message.content}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="border-t border-base-300 p-4 flex gap-2">

        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="Type a message..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <button
          className="btn btn-primary"
          onClick={handleSendMessage}
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default ChatWindow;