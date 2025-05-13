import React, { useState } from "react";
import axios from "./api/axios";

const PasswordChangeModal = ({ isOpen, onClose, email, onPasswordChanged }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/change-password",
        {
          email: email,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Remember-Token": token,
          },
        }
      );

      if (response.data.status === "success") {
        onPasswordChanged();
      } else {
        setError(response.data.message || "Failed to change password");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while changing password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        {/* Add this div for the header with close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#0A2472]">
            Change Your Password
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          For security reasons, please change your password before continuing.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative h-14 mb-4">
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent"
            />
            <label
              htmlFor="newPassword"
              className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
            >
              New Password
            </label>
          </div>

          <div className="relative h-14 mb-6">
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent"
            />
            <label
              htmlFor="confirmPassword"
              className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
            >
              Confirm Password
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-2xl transition duration-300 ${
                isSubmitting
                  ? "bg-blue-900 cursor-not-allowed"
                  : "bg-[#0A2472] hover:bg-blue-950 text-white"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
