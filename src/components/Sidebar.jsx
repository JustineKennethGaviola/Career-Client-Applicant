import React from "react";
import { NavLink } from "react-router-dom";
import CompanyLogo from "./../assets/RCCLogo-White.png";

const Sidebar = () => {
  return (
    <div className="bg-[#0A2472] text-white w-90 min-h-screen">
      {/* Logo */}
      <div className="py-6 px-4 flex items-center justify-center">
        <img src={CompanyLogo} alt="RCC Logo" className="h-12" />
        <div className="ml-2 font-semibold">
          <div className="font-bold">RCC COLAB SOLUTIONS INC.</div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="px-4 pt-6 pb-8">
        <div className="space-y-1">
          {/* <NavLink
            to="/client/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-blue-800/40 shadow-md"
                  : "text-blue-100 hover:bg-blue-800/40"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </NavLink> */}

          <NavLink
            to="/client/applicants"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-blue-800/40 shadow-md"
                  : "text-blue-100 hover:bg-blue-800/40"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Applicants
          </NavLink>

          <NavLink
            to="/client/company-profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-blue-800/40 shadow-md"
                  : "text-blue-100 hover:bg-blue-800/40"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Company Profile
          </NavLink>

          <NavLink
            to="/client/message"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-blue-800/40 shadow-md"
                  : "text-blue-100 hover:bg-blue-800/40"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Messages
          </NavLink>

          <NavLink
            to="/client/schedules"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "text-white bg-blue-800/40 shadow-md"
                  : "text-blue-100 hover:bg-blue-800/40"
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Schedules
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
