import React from "react";
import { Link } from "react-router-dom";
import CompanyLogo from "./../../assets/RCCLogo-Blue.png"; // Adjust the path as necessary

const Header = () => {
  return (
    <header className="bg-white py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto relative h-20">
        {/* Left side with logo - positioned absolutely at the left edge */}
        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2">
          <Link to="/" className="flex items-center">
            <img
              src={CompanyLogo}
             
              alt="RCC Colab Solutions"
              className="h-16 w-30"
            />
            <span className="ml-2 text-[#0A2472] font-bold text-xl">
              RCC Colab Solutions
            </span>
          </Link>
        </div>

        {/* Right side with navigation - positioned absolutely at the right edge */}
        <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
          <nav className="hidden md:flex items-center">
            <div className="flex space-x-8">
              <Link
                to="https://rcccolabsolutions.com"
                className="py-2 text-gray-700 hover:text-[#0A2472] font-medium border-b-2 border-transparent hover:border-[#0A2472] transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="https://rcccolabsolutions.com/aboutus"
                className="py-2 text-gray-700 hover:text-[#0A2472] font-medium border-b-2 border-transparent hover:border-[#0A2472] transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                to="https://rcccolabsolutions.com/services"
                className="py-2 text-gray-700 hover:text-[#0A2472] font-medium border-b-2 border-transparent hover:border-[#0A2472] transition-colors duration-200"
              >
                Services
              </Link>
              <Link
                to="https://rcccolabsolutions.com/services/careerJob"
                className="py-2 text-gray-700 hover:text-[#0A2472] font-medium border-b-2 border-transparent hover:border-[#0A2472] transition-colors duration-200"
              >
                Careers
              </Link>
              <Link
                to="https://rcccolabsolutions.com/contactus"
                className="ml-2 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 font-medium transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700">
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
