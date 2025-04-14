import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logoImage from "../assets/RCCLogo-Blue.png";
import axios from "../api/axios";

const LoginForm = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [applicationCode, setApplicationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = React.createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = recaptchaRef.current.getValue();
      if (!token) {
        alert("Please complete the reCAPTCHA challenge.");
        return;
      }
      const response = await axios.post("/checkapplicant", {
        application_code: applicationCode,
        token: token,
      });

      alert(response.data.data.name);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden transform transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold">Welcome Back</h1>
                <p className="text-blue-100 text-sm mt-1">
                  Enter your application code to continue
                </p>
              </div>
              {/* Company logo */}
              <div className="bg-white p-2 rounded-full shadow-md">
                <img
                  src={logoImage}
                  alt="RCC Colab Solutions"
                  className="h-12 w-12"
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Application Info Card */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-[#0A2472]">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#0A2472] mt-0.5 mr-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <h3 className="text-sm font-semibold text-[#0A2472]">
                    Applicant Portal
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    Access your application status and details by entering the
                    code provided in your confirmation email.
                  </p>
                </div>
              </div>
            </div>

            {/* Application Code Input */}
            <div className="mb-6">
              <label
                htmlFor="application_code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Application Code
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="application_code"
                  name="application_code"
                  value={applicationCode}
                  onChange={(e) => setApplicationCode(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472] transition-all duration-300"
                  placeholder="Enter your application code"
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Example: APP-12345-XYZ
              </p>
            </div>

            {/* reCAPTCHA */}
            <div className="my-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] hover:from-[#0A2472] hover:to-[#0A2472] text-white rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                </span>
              ) : (
                "Access Application"
              )}
            </button>

            {/* Help section */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an application code?{" "}
                <a
                  href="#"
                  className="text-[#0A2472] font-medium hover:underline"
                >
                  Apply now
                </a>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Need help?{" "}
                <a href="#" className="text-gray-600 hover:text-[#0A2472]">
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
