import React, { useState } from "react";

const MessagesModal = ({ isOpen, onClose }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showCompose, setShowCompose] = useState(false);

  // Sample messages only
  const messages = [
    {
      id: 1,
      sender: "Molee Magsino",
      role: "Human Resources",
      lastMessage:
        "We received your application for the Frontend Developer position. Our team is currently reviewing it.",
      timestamp: "2 hours ago",
      isRead: false,
      avatar: "👤",
      applicationStatus: "In Review",
    },
    {
      id: 2,
      sender: "Kent Cortiguerra",
      role: "Full Stack Developer",
      lastMessage:
        "Hi! I would like to schedule a technical interview for next week. Are you available on Tuesday at 10 AM?",
      timestamp: "1 day ago",
      isRead: true,
      avatar: "💼",
      applicationStatus: "Interview Scheduled",
    },
    {
      id: 3,
      sender: "System Notification",
      role: "System",
      lastMessage:
        "Application Code: APP-12345-XYZ has been successfully submitted.",
      timestamp: "3 days ago",
      isRead: true,
      avatar: "🔔",
      applicationStatus: "Submitted",
    },
  ];

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
            {selectedMessage && (
              <button
                onClick={() => setSelectedMessage(null)}
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
                {selectedMessage ? selectedMessage.sender : "Messages"}
              </h3>
              <p className="text-sm text-blue-100 mt-1">
                {selectedMessage
                  ? "Application Communication"
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

        {selectedMessage ? (
          /* Message Detail View */
          <div className="relative h-full flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedMessage.role === "Human Resources"
                      ? "bg-[#0A2472]"
                      : selectedMessage.role === "Recruitment"
                      ? "bg-purple-600"
                      : "bg-gray-600"
                  }`}
                >
                  <span className="text-white text-xl">
                    {selectedMessage.avatar}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedMessage.sender}
                  </h4>
                  <p className="text-sm text-[#0A2472]">
                    {selectedMessage.role}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-gray-700">{selectedMessage.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedMessage.timestamp}
                </p>
              </div>

              <div className="border-t pt-4">
                <h5 className="text-sm font-medium text-gray-900 mb-2">
                  Reply to this message
                </h5>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] resize-none"
                  rows="4"
                  placeholder="Type your reply here..."
                />
                <button className="mt-3 bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] text-white py-2 px-4 rounded-lg font-medium hover:from-[#1A3A8F] hover:to-[#0A2472] transition-all duration-300">
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Messages List */
          <div className="flex-1 overflow-y-auto h-[calc(100%-200px)]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 ${
                  !message.isRead ? "bg-blue-50/50" : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.role === "Human Resources"
                          ? "bg-[#0A2472]"
                          : message.role === "Recruitment"
                          ? "bg-purple-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span className="text-white text-lg">
                        {message.avatar}
                      </span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {message.sender}
                      </p>
                      <div className="flex items-center">
                        {!message.isRead && (
                          <span className="inline-block w-2 h-2 bg-[#0A2472] rounded-full mr-2"></span>
                        )}
                        <p className="text-xs text-gray-500 ml-2">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-[#0A2472] mb-1 font-medium">
                      {message.role}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {message.lastMessage}
                    </p>
                    {message.applicationStatus && (
                      <span
                        className={`inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                          message.applicationStatus === "In Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : message.applicationStatus ===
                              "Interview Scheduled"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {message.applicationStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State when no messages */}
            {messages.length === 0 && (
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
        )}

        {/* Compose new message button */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={() => {
              setShowCompose(true);
              setSelectedMessage(null);
            }}
            className="w-full bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] text-white py-3 px-4 rounded-lg font-medium hover:from-[#1A3A8F] hover:to-[#0A2472] transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            <span>Compose Message</span>
          </button>
        </div>

        {/* Compose Message Form */}
        {showCompose && (
          <div className="absolute inset-0 bg-white z-10">
            <div className="bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] p-6 text-white flex justify-between items-center">
              <div className="flex items-center">
                <button
                  onClick={() => setShowCompose(false)}
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
                <h3 className="text-lg font-semibold">Compose New Message</h3>
              </div>
              <div></div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472]">
                  <option value="">Select recipient...</option>
                  <option value="hr">HR Team</option>
                  <option value="recruiter">Tech Recruiter</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] resize-none"
                  rows="6"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] text-white py-3 px-4 rounded-lg font-medium hover:from-[#1A3A8F] hover:to-[#0A2472] transition-all duration-300">
                  Send Message
                </button>
                <button
                  onClick={() => setShowCompose(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Message Floating Action Button
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
        {/* Unread indicator */}
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <span className="sr-only">Open messages</span>
    </button>
  );
};

export default MessagesModal;
