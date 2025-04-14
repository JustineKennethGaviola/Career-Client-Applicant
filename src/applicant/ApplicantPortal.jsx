import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import logoImage from "../assets/RCCLogo-White.png";
import axios from "../api/axios";

const ApplicantPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [applicantData, setApplicantData] = useState(null);
  const [applicantStatus, setApplicantStatus] = useState(null);
  const [applicationCode, setApplicationCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const recaptchaRef = React.createRef();
  const [, setLoginSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = recaptchaRef.current.getValue();
      if (!token) {
        alert("Please complete the reCAPTCHA challenge.");
        setIsSubmitting(false);
        return;
      }

      const response = await axios.post("/checkapplicant", {
        application_code: applicationCode,
        token: token,
      });

      // Store applicant data from response
      setApplicantData(response.data.data);
      console.log(response.data.statuses);

      // Set login status to true
      setIsLoggedIn(true);

      // Set login success message
      setLoginSuccess(true);
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-4">
      <div
        className={`w-full transition-all duration-500 ease-in-out ${
          isLoggedIn ? "max-w-5xl flex-row" : "max-w-md flex-col"
        } flex gap-8 items-stretch`}
      >
        {/* Login Form - moves to left on login */}
        <div
          className={`w-full transition-all duration-500 ${
            isLoggedIn ? "md:w-1/2" : "md:w-full"
          }`}
        >
          <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full transform transition-all">
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
                <img
                  src={logoImage}
                  alt="RCC Colab Solutions"
                  className="h-16 w-18"
                />
              </div>
            </div>

            <div className="p-6">
              {/* Application Info Card */}
              <div
                className={`rounded-lg p-4 mb-6 border-l-4 ${
                  isLoggedIn
                    ? "bg-green-50 border-green-500"
                    : "bg-blue-50 border-[#0A2472]"
                }`}
              >
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 mt-0.5 mr-3 ${
                      isLoggedIn ? "text-green-500" : "text-[#0A2472]"
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    {isLoggedIn ? (
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    )}
                  </svg>
                  <div>
                    <h3
                      className={`text-sm font-semibold ${
                        isLoggedIn ? "text-green-700" : "text-[#0A2472]"
                      }`}
                    >
                      {isLoggedIn ? "Login Successful" : "Applicant Portal"}
                    </h3>
                    <p
                      className={`text-xs ${
                        isLoggedIn ? "text-green-600" : "text-gray-600"
                      } mt-1`}
                    >
                      {isLoggedIn
                        ? "Your application details are now available in the panel to the right."
                        : "Access your application status and details by entering the code provided in your confirmation email."}
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
                    onChange={(e) =>
                      !isLoggedIn && setApplicationCode(e.target.value)
                    }
                    className={`w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none ${
                      isLoggedIn
                        ? "bg-gray-100 cursor-not-allowed"
                        : "focus:ring-2 focus:ring-[#0A2472] focus:border-[#0A2472]"
                    } transition-all duration-300`}
                    placeholder="Enter your application code"
                    readOnly={isLoggedIn}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-500">
                  Example: APP-12345-XYZ
                </p>
              </div>

              {/* reCAPTCHA */}
              <div className="my-4 overflow-x-auto">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  ref={recaptchaRef}
                  size="normal"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || isLoggedIn}
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
                ) : isLoggedIn ? (
                  "Logged In"
                ) : (
                  "Access Application"
                )}
              </button>

              {/* Help section */}
              {!isLoggedIn && (
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
              )}
            </div>
          </div>
        </div>

        {/* Profile Section - Right Side - Only shows when logged in */}
        {isLoggedIn && (
          <div
            className="w-full md:w-1/2 transition-all duration-700 ease-in-out transform"
            style={{
              animation: "slideInFromRight 0.7s ease-out forwards",
            }}
          >
            <div className="bg-white shadow-lg rounded-xl overflow-hidden h-full">
              {/* Profile Header with Avatar */}
              <div className="bg-gradient-to-r from-[#0A2472] to-[#1A3A8F] p-6 text-white relative">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">Application Details</h2>
                    <p className="text-blue-100 text-sm mt-1">
                      Your application information
                    </p>
                  </div>
                  <div className="bg-white rounded-full p-1 shadow-md">
                    <div className="bg-[#0A2472] rounded-full w-10 h-10 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Card */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-gray-50 shadow-inner border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Application Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                      {applicantData?.application_status || "Pending"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Application ID</p>
                    <p className="text-sm font-medium">{applicationCode}</p>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="p-5">
                {/* Personal Info Section */}
                <div className="mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
                    Personal Information
                  </h3>

                  {/* Name with icon */}
                  <div className="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-[#0A2472] mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {applicantData?.name || "Not Available"}
                      </p>
                    </div>
                  </div>

                  {/* Contact info with icons */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0A2472] mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium truncate">
                          {applicantData?.email || "Not Available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0A2472] mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium">
                          {applicantData?.phone || "Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Details */}
                <div className="mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
                    Position Details
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0A2472] mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Position</p>
                        <p className="text-sm font-medium">
                          {applicantData?.position || "Not Available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-[#0A2472] mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-xs text-gray-500">Date Applied</p>
                        <p className="text-sm font-medium">
                          {applicantData?.date_applied || "Not Available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Timeline */}
                <div className="mb-5">
                  <h3 className="text-md font-semibold text-gray-700 mb-3 border-b pb-2">
                    Application Timeline
                  </h3>
                  

                  <div className="space-y-3">
                    <div className="flex">
                      <div className="flex-none mr-3">
                        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          Application Submitted
                        </p>
                        <p className="text-xs text-gray-500">
                          {applicantData?.date_applied || "Date not available"}
                        </p>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="flex-none mr-3">
                        <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Under Review</p>
                        <p className="text-xs text-gray-500">Current Status</p>
                      </div>
                    </div>
                  </div>
                </div>

               
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantPortal;
