import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import ReCAPTCHA from "react-google-recaptcha";

// Toast component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 transition-all duration-500 transform z-50">
      <div
        className={`rounded-lg shadow-lg px-6 py-4 ${
          type === "error"
            ? "bg-red-600 text-white"
            : type === "success"
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="shrink-0">
            {type === "error" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            ) : type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = React.createRef();

  // Toast state
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Function to show toast
  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  // Function to hide toast
  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = recaptchaRef.current.getValue();
      if (!token) {
        showToast("Please complete the reCAPTCHA challenge.", "error");
        return;
      }

      const response = await axios.post("/loginfront", {
        email: email,
        code: code,
        token: token,
      });

      // If successful, show success toast
      showToast("Login successful! Redirecting to dashboard...");

      // Save data to localStorage
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", response.data.data.user);
      localStorage.setItem("email", response.data.data.email);

      // Short delay before redirect to show the toast
      setTimeout(() => {
        navigate("/client/applicants");
      }, 1500);
    } catch (err) {
      console.error(err);

      // Handle different error cases
      if (err.response) {
        if (err.response.data.message) {
          // Backend returned a specific error message
          showToast(err.response.data.message, "error");
        } else if (err.response.status === 401) {
          // Unauthorized - wrong email or code
          showToast(
            "Invalid email or sign-in code. Please try again.",
            "error"
          );
        } else {
          // Generic server error
          showToast("Server error. Please try again later.", "error");
        }
      } else if (err.request) {
        // Network error
        showToast("Network error. Please check your connection.", "error");
      } else {
        // Other errors
        showToast("An unexpected error occurred. Please try again.", "error");
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Toast notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/src/assets/RCCLogo-Blue.png"
              alt="RCC Logo"
              className="h-16"
            />
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
              Login to your account.
            </h1>
            <p className="text-center text-gray-600">
              Hello, welcome back to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Company Email */}
            <div className="relative h-14 mb-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="email"
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
              >
                Company Email
              </label>
            </div>

            {/* Sign in code */}
            <div className="relative h-14 mt-6">
              <input
                type="password"
                placeholder="Sign In Code"
                name="code"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="code"
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
              >
                Sign in code
              </label>
            </div>

            {/* reCAPTCHA */}
            <div className="my-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-60 bg-[#0A2472] hover:bg-blue-950 text-white font-medium py-3 px-4 rounded-2xl transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div
        className="hidden md:block md:w-1/2 relative bg-[#0A2472]"
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/login-page.png"
            alt="Background"
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>

        {/* Company name */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-white text-4xl lg:text-6xl font-bold tracking-wider">
            <div>RCC COLAB</div>
            <div>SOLUTIONS INC.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
