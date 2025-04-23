import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-[#0A2472] mt-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 px-6 lg:px-0 max-w-screen-xl w-full mx-auto pt-20 pb-16 text-white/90">
        {/* Logo and Social Media Section */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-2 pb-4 h-20">
            <img
              className="h-full brightness-200"
              src="/src/assets/RCCLogo-White.png"
              alt="RCC Logo"
            />
            <h1 className="hidden text-xl lg:block mt-3 font-semibold text-white p-1 ml-2">
              RCC Colab Solutions
            </h1>
          </Link>
          <p className="text-sm leading-6 pr-12">
            Your trusted partner for personalized IT software and consulting
            solutions, delivering excellence in innovation, quality, and
            service.
          </p>
          <div className="mt-4 pb-1 text-lg font-semibold cursor-default">
            Social Media
          </div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.linkedin.com/company/rcc-colab-solutions-inc/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl leading-7 hover:text-cyan-500 cursor-pointer transition-all duration-300"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61567286702449"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl leading-7 hover:text-cyan-500 cursor-pointer transition-all duration-300"
            >
              <svg
                className="h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="lg:col-span-2">
          <p className="pb-2 text-lg font-semibold cursor-default">
            Quick Links
          </p>
          <ul className="text-md">
            <li className="leading-8 hover:text-cyan-500 cursor-pointer transition-all duration-200">
              <Link to="https://rcccolabsolutions.com">Home</Link>
            </li>
            <li className="leading-8 hover:text-cyan-500 cursor-pointer transition-all duration-200">
              <Link to="https://rcccolabsolutions.com/aboutus">About Us</Link>
            </li>
            <li className="leading-8 hover:text-cyan-500 cursor-pointer transition-all duration-200">
              <Link to="https://rcccolabsolutions.com/services">Services</Link>
            </li>
            <li className="leading-8 hover:text-cyan-500 cursor-pointer transition-all duration-200">
              <Link to="/careers">Careers</Link>
            </li>
            <li className="leading-8 hover:text-cyan-500 cursor-pointer transition-all duration-200">
              <Link to="https://rcccolabsolutions.com/contactus">Contact Us</Link>
            </li>
            <li className="lg:hidden block leading-8 hover:text-emerald-500 cursor-pointer transition-all duration-200">
              <Link to="/terms">Terms of Use</Link>
            </li>
            <li className="lg:hidden block leading-8 hover:text-emerald-500 cursor-pointer transition-all duration-200">
              <Link to="/privacy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Office Address Section */}
        <div className="lg:col-span-3">
          <p className="pb-2 text-lg font-semibold cursor-default">
            Office Address
          </p>
          <ul>
            <li className="leading-7 text-balance flex items-center gap-2">
              7/F Ascott Makati Glorietta 4, Ayala Center San Lorenzo, Makati
              City
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="lg:col-span-3 text-nowrap">
          <p className="pb-2 text-lg font-semibold cursor-default">
            Contact Us
          </p>
          <ul className="text-md">
            <li className="leading-9 flex items-center hover:text-cyan-500 cursor-pointer transition-all duration-300 gap-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a href="tel:+632 8651 6572" className="text-md">
                +632 8651 6572
              </a>
            </li>
            <li className="leading-9 flex items-center hover:text-cyan-500 cursor-pointer transition-all duration-300 gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a href="mailto:info@rcccolabsolutions.com" className="text-md">
                info@rcccolabsolutions.com
              </a>
            </li>
            <li className="leading-9 flex items-center hover:text-cyan-500 cursor-pointer transition-all duration-300 gap-2">
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <a href="https://rcccolabsolutions.com" className="text-md">
                rcccolabsolutions.com
              </a>
            </li>
            <li className="leading-9 flex items-center gap-2">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-md">
                Mon to Fri{" "}
                <span className="text-white/70">(8:00AM-5:00PM)</span>
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="max-w-screen-xl flex justify-between text-white/80 cursor-pointer mx-auto border-t md:border-t-2 border-white/50 w-11/12 lg:w-full text-center md:text-left py-6">
        <ul className="hidden lg:flex gap-6">
          <li className="hover:underline">
            <Link to="/terms">Terms of Use</Link>
          </li>
          <li className="hover:underline">
            <Link to="/privacy">Privacy Policy</Link>
          </li>
        </ul>
        <p>© 2024 RCC Colab Solutions, Inc.</p>
      </div>
    </div>
  );
};

export default Footer;
