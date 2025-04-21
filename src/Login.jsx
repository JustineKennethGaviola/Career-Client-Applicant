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

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 ${bgColor} text-white rounded-lg shadow-lg max-w-xs`}
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {type === "success" ? (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        )}
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 text-white hover:text-gray-200 rounded-lg p-1.5 inline-flex h-8 w-8"
        onClick={onClose}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
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
