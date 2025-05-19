import React, { useState, useEffect } from "react";
import axiosInstance from "../api/tokenizedaxios";

const MessagesModal = ({
  isOpen,
  onClose,
  applicantId,
  conversations,
  onConversationUpdate,
}) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const selectConversation = async (conversation) => {
    setSelectedConversation(conversation);

    try {
      const response = await axiosInstance.get(
        `/messages/applicant/conversation/${conversation.id}`
      );

      if (response.data.status === "success") {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);

    try {
      const response = await axiosInstance.post("/messages/applicant/send", {
        conversation_id: selectedConversation.id,
        sender_id: applicantId,
        receiver_id: selectedConversation.company_id,
        message: newMessage,
        is_from_client: false,
      });

      if (response.data.status === "success") {
        setNewMessage("");
        await selectConversation(selectedConversation);
        onConversationUpdate();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    if (typeof timestamp === "string" && timestamp.includes(":")) {
      return timestamp;
    }

    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    if (!selectedConversation) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await axiosInstance.get(
          `/messages/applicant/conversation/${selectedConversation.id}`
        );

        if (response.data.status === "success") {
          if (response.data.data.length > messages.length) {
            setMessages(response.data.data);
            onConversationUpdate();
          }
        }
      } catch (error) {
        console.error("Error polling messages:", error);
      }
    }, 5000);

    return () => clearInterval(pollInterval);
  }, [
    selectedConversation,
    messages.length,
    applicantId,
    onConversationUpdate,
  ]);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "visible" : "invisible"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`absolute right-0 top-0 h-full w-full sm:w-96 lg:w-[450px] bg-white shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] p-6 text-white flex justify-between items-center shadow-lg">
          <div className="flex items-center">
            {selectedConversation && (
              <button
                onClick={() => {
                  setSelectedConversation(null);
                  setMessages([]);
                }}
                className="mr-4 p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {selectedConversation
                  ? selectedConversation.company_name
                  : "Messages"}
              </h3>
              <p className="text-sm text-blue-100 mt-1">
                {selectedConversation
                  ? selectedConversation.job_title
                  : "Application Communications"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {!selectedConversation ? (
          /* Conversations List */
          <div className="flex-1 overflow-y-auto h-[calc(100%-200px)]">
            {conversations.length > 0 ? (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${
                    conversation.unread_count > 0 ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => selectConversation(conversation)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#0A2472] flex items-center justify-center">
                        <span className="text-white text-lg">🏢</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {conversation.company_name}
                        </p>
                        <div className="flex items-center">
                          {conversation.unread_count > 0 && (
                            <span className="inline-block w-2 h-2 bg-[#0A2472] rounded-full mr-2"></span>
                          )}
                          <p className="text-xs text-gray-500 ml-2">
                            {formatTime(conversation.last_message_time)}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-[#0A2472] mb-1 font-medium">
                        {conversation.job_title}
                      </p>
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.last_message || "No messages yet"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  No messages yet
                </h4>
                <p className="text-sm text-gray-500">
                  You'll see updates about your application here
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Messages View */
          <div className="flex-1 flex flex-col h-[calc(100%-104px)]">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${
                      message.received ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        message.received
                          ? "bg-gray-200 text-gray-800"
                          : "bg-blue-500 text-white"
                      }`}
                    >
                      <p>{message.content[0]}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {formatTime(message.time || message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No messages yet</div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg mr-2"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !newMessage.trim()}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                >
                  {sendingMessage ? "..." : "Send"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const MessageButton = ({ onClick, hasUnread = true }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] hover:from-[#1A3A8F] hover:to-[#0A2472] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <span className="sr-only">Open messages</span>
    </button>
  );
};

export default MessagesModal;
