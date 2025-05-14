import { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import axiosInstance from "./api/tokenizedaxios";

function Messages() {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/messages/conversations");
        if (response.data.status === "success") {
          const conversationsData = response.data.data.map((conv) => ({
            ...conv,
            active: false,
          }));
          setConversations(conversationsData);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();
  }, [location.state]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const selectConversation = async (conversation) => {
    const updatedConversations = conversations.map((conv) => ({
      ...conv,
      active: conv.id === conversation.id,
    }));

    setConversations(updatedConversations);
    setActiveConversation(conversation);

    // Fetch messages for this conversation
    try {
      const response = await axiosInstance.get(
        `/messages/conversation/${conversation.id}`
      );

      if (response.data.status === "success") {
        setMessages(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Send a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !activeConversation || sendingMessage) return;

    setSendingMessage(true);

    const tempMessageObj = {
      id: Date.now(),
      sender: "Company",
      initial: "C",
      content: [newMessage],
      received: false,
      timestamp: new Date().toISOString(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, tempMessageObj]);
    setNewMessage("");

    try {
      const clientId = localStorage.getItem("client_id") || "7";

      const response = await axiosInstance.post("/messages/send", {
        conversation_id: activeConversation.id,
        sender_id: clientId,
        receiver_id: activeConversation.applicant_id,
        message: newMessage,
      });

      if (response.data.status !== "success") {
        console.error("Failed to send message:", response.data);
      } else {
        setConversations((prev) =>
          prev.map((conv) => {
            if (conv.id === activeConversation.id) {
              return {
                ...conv,
                last_message: newMessage,
                last_message_time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              };
            }
            return conv;
          })
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <div className="flex h-screen bg-white">
      {/* Chat Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Chat Interface Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Chat List */}
          <div className="w-80 border-r flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center">
              <h1 className="text-xl font-semibold">Messages</h1>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 border-0 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Inbox Tab */}
            <div className="px-4 py-2 bg-blue-100 text-blue-700 font-medium text-sm">
              Inbox
            </div>

            {/* Conversation List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex justify-center items-center h-24">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
              ) : filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 ${
                      conversation.active
                        ? "bg-blue-50 border-l-4 border-blue-500"
                        : ""
                    } hover:bg-blue-50 cursor-pointer`}
                    onClick={() => selectConversation(conversation)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full ${
                          conversation.active
                            ? "bg-blue-200 text-blue-600"
                            : "bg-gray-200 text-gray-600"
                        } flex items-center justify-center mr-3 flex-shrink-0`}
                      >
                        <span>{conversation.initial}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.name}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {conversation.last_message_time}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {conversation.last_message || "New conversation"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <p className="text-center">No conversations found</p>
                  <p className="text-center text-sm mt-1">
                    {searchTerm
                      ? "Try a different search term"
                      : "Messages with applicants will appear here"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Conversation Area */}
          {activeConversation ? (
            <div className="flex-1 flex flex-col">
              {/* Chat Header - Contact Name */}
              <div className="py-3 px-4 border-b flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-3">
                    <span>{activeConversation.initial}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">
                      {activeConversation.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {activeConversation.job_title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {messages.length > 0 ? (
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-start ${
                        message.received ? "" : "justify-end"
                      }`}
                    >
                      {message.received && (
                        <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                          <span>{activeConversation.initial}</span>
                        </div>
                      )}

                      <div
                        className={`space-y-2 ${
                          message.received ? "max-w-md" : "max-w-md"
                        }`}
                      >
                        {message.content.map((text, idx) => (
                          <div key={idx}>
                            <div
                              className={`${
                                message.received
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-blue-500 text-white ml-auto"
                              } rounded-lg p-3 text-sm`}
                            >
                              <p>{text}</p>
                            </div>
                            {idx === message.content.length - 1 && (
                              <p
                                className={`text-xs text-gray-500 mt-1 ${
                                  message.received ? "" : "text-right"
                                }`}
                              >
                                {message.time ||
                                  new Date(
                                    message.timestamp
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {!message.received && (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2 flex-shrink-0">
                          <span>C</span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-300 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <p>No messages yet</p>
                    <p className="text-center text-sm mt-1">
                      Start the conversation by sending a message
                    </p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="px-4 py-3 border-t flex items-center">
                <input
                  type="text"
                  placeholder={`Message ${activeConversation.name}...`}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  className="flex-1 bg-gray-200 border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={sendingMessage}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !newMessage.trim()}
                  className={`ml-2 p-2 rounded-full ${
                    sendingMessage || !newMessage.trim()
                      ? "bg-blue-300"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white`}
                >
                  {sendingMessage ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No conversation selected
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  {conversations.length > 0
                    ? "Select a conversation from the list to begin messaging."
                    : "You don't have any conversations yet. Start messaging applicants from the Applicants page."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
