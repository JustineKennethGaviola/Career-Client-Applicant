import { useState } from "react";
import { Link } from "react-router-dom";

function Messages() {
  const [conversations] = useState([
    {
      id: 1,
      name: "Juan Dela Cruz",
      initial: "J",
      lastMessage: "Message You",
      time: "12:23",
      active: true,
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      initial: "J",
      lastMessage: "Message You",
      time: "12:23",
      active: false,
    },
  ]);

  const [messages] = useState([
    {
      id: 1,
      sender: "Juan Dela Cruz",
      initial: "J",
      content: [
        "This is a sample message",
        "This is a longer sample message to demonstrate how longer messages appear in the chat interface.",
      ],
      received: true,
    },
    {
      id: 2,
      sender: "Company",
      initial: "C",
      content: [
        "This is a sample reply message",
        "Here's a longer reply message to show how user replies are displayed.",
      ],
      received: false,
    },
  ]);

  return (
    <div className="flex h-screen bg-white">
      {/* Chat Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Chat Interface Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Chat List */}
          <div className="w-80 border-r flex flex-col bg-white">
            {/* Chat Header */}
            <div className="p-1 border-b flex items-center">
              <h1 className="text-xl font-semibold ml-1">Chats</h1>
            </div>

            {/* Search Bar */}
            <div className="px-4 py-2 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
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
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-3 ${
                    conversation.active
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  } hover:bg-blue-50 cursor-pointer`}
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
                          {conversation.time}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Conversation Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header - Contact Name */}
            <div className="py-3 px-4 border-b flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-3">
                  <span>J</span>
                </div>
                <h3 className="text-lg font-medium">Juan Dela Cruz</h3>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start ${
                    message.received ? "max-w-md" : "justify-end"
                  }`}
                >
                  {message.received && (
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-600 mr-2 flex-shrink-0">
                      <span>{message.initial}</span>
                    </div>
                  )}

                  <div className="space-y-2">
                    {message.content.map((text, index) => (
                      <div
                        key={index}
                        className={`${
                          message.received
                            ? "bg-gray-200 text-gray-800"
                            : "bg-blue-500 text-white ml-auto"
                        } rounded-lg p-3 text-sm max-w-md`}
                      >
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>

                  {!message.received && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white ml-2 flex-shrink-0">
                      <span>{message.initial}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="px-4 py-3 border-t flex items-center">
              <input
                type="text"
                placeholder="Message @Juan Dela Cruz"
                className="flex-1 bg-gray-200 border-0 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="ml-2 text-gray-500 hover:text-gray-700">
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
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
