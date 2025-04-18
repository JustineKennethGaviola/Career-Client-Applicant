import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  //check the email from local storage
  const email = localStorage.getItem("email");
  const user = localStorage.getItem("user");


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  const handleSignOut = (e) => {
    e.preventDefault();
    // In a real app, you would also clear any auth tokens/cookies here
    navigate("/login");
  };

  return (
    <div className="bg-white shadow-lg h-20 flex items-center px-4 justify-end">
      <div className="flex items-center">
        <div className="relative inline-block" ref={dropdownRef}>
          <button
            className="shadow-lg flex items-center rounded-lg border border-gray-300 px-3 py-2 w-80"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="bg-[#0A2472] text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
              <span>
                {user ? user.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
            <span className="text-gray-700 mr-2">
              {user ? user : "User"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 ml-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div
            className={`absolute right-0 mt-2 min-w-48 z-10 transition-all duration-300 bg-white shadow-lg rounded-lg border border-gray-200 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <div className="py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">
                   {email}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
