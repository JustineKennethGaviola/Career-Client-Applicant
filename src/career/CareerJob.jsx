import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import careerBackground from "./assets/Career.png";

const CareerJob = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [workType, setWorkType] = useState("");
  const [expandedJobId, setExpandedJobId] = useState(null);
  const navigate = useNavigate();

  const toggleJobExpansion = (index) => {
    if (expandedJobId === index) {
      setExpandedJobId(null);
    } else {
      setExpandedJobId(index);
    }
  };

  // Sample job listings
  const jobListings = [
    {
      title: "Information Technology",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit",
      type: "Full-Time",
      location: "Lorem ipsum dolor sit amet",
      summary:
        "It Lorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n\nLorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    },
    {
      title: "Back End Software Engineer",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit",
      type: "Full-Time",
      location: "Lorem ipsum dolor sit amet",
      summary:
        "It Lorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n\nLorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    },
    {
      title: "Quality Assurance Specialist",
      description: "Lorem ipsum dolor sit amet, consectetur adipisci elit",
      type: "Full-Time",
      location: "Lorem ipsum dolor sit amet",
      summary:
        "It Lorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.\n\nLorem ipsum dolor sit amet, consectetur adipisci elit. Sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-[#0A2472] overflow-hidden"
        style={{ clipPath: "polygon(100% 1%, 100% 85%, 50% 100%, 0 85%, 0 0)" }}
      >
        {/* Image */}
        <img
          src={careerBackground}
          alt="Background"
          className="absolute w-full h-full object-cover object-center opacity-20"
        />

        <div className="relative z-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center justify-center pt-[150px] pb-[150px] h-fit px-6 lg:px-0">
              <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-semibold text-center">
                Grow your Career at RCC Colab Solutions
              </h1>
              <p className="mt-6 text-white/80 max-w-3xl text-base sm:text-lg text-justify leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrum exercitationem ullam corporis
                suscipit laborious, nisi ut aliquid ex ea commodi consequatur.
              </p>
              <a
                href="#open-positions"
                className="mt-8 inline-block border-2 border-orange-500 text-white rounded-full px-8 py-3 hover:bg-orange-500 transition"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Job Search Section */}
      <section id="open-positions" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#0A2472]">
            Join the RCC Colab Solution
          </h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto text-justify leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod
            tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrum exercitationem ullam corporis suscipit.
          </p>

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            <div className="col-span-1 md:col-span-2">
              <input
                type="text"
                placeholder="Search Job Title..."
                className="w-full p-3 border border-gray-300 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <div className="relative">
                <select
                  className="w-full p-3 border border-gray-300 rounded appearance-none bg-white"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Location</option>
                  <option value="remote">Remote</option>
                  <option value="office">Office</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none bg-white"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="">Department</option>
                <option value="it">IT</option>
                <option value="hr">HR</option>
                <option value="marketing">Marketing</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                className="w-full p-3 border border-gray-300 rounded appearance-none bg-white"
                value={workType}
                onChange={(e) => setWorkType(e.target.value)}
              >
                <option value="">Work Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <div
                key={index}
                className={`border border-gray-200 rounded-lg p-6 shadow-sm transition cursor-pointer ${
                  expandedJobId === index
                    ? "bg-white shadow-md"
                    : "hover:bg-[#0A2472] hover:shadow-md group"
                }`}
                onClick={() => toggleJobExpansion(index)}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        expandedJobId === index
                          ? "text-[#0A2472]"
                          : "group-hover:text-white"
                      } transition-colors`}
                    >
                      {job.title}
                    </h3>
                    <p
                      className={`${
                        expandedJobId === index
                          ? "text-gray-600"
                          : "text-gray-600 group-hover:text-white/90"
                      } transition-colors`}
                    >
                      {job.description}
                    </p>
                  </div>
                  <div className="min-w-[200px]">
                    <div className="mb-3">
                      <p
                        className={`font-medium ${
                          expandedJobId === index
                            ? "text-gray-700"
                            : "text-gray-700 group-hover:text-white"
                        } transition-colors`}
                      >
                        Work Type
                      </p>
                      <p
                        className={`${
                          expandedJobId === index
                            ? "text-gray-600"
                            : "text-gray-600 group-hover:text-white/90"
                        } transition-colors`}
                      >
                        {job.type}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          expandedJobId === index
                            ? "text-gray-700"
                            : "text-gray-700 group-hover:text-white"
                        } transition-colors`}
                      >
                        Location
                      </p>
                      <p
                        className={`${
                          expandedJobId === index
                            ? "text-gray-600"
                            : "text-gray-600 group-hover:text-white/90"
                        } transition-colors`}
                      >
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <div
                      className={`${
                        expandedJobId === index
                          ? "text-blue-800"
                          : "text-blue-800 group-hover:text-white"
                      } transition-colors`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 transition-transform ${
                          expandedJobId === index ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded job details section */}
                {expandedJobId === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-[#0A2472]">
                          Job Summary
                        </h4>
                        <p className="text-gray-700 whitespace-pre-line">
                          {job.summary}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          className="bg-[#0A2472] text-white px-6 py-2 rounded hover:bg-blue-900 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Navigate to the Career page with job details
                            // You'll need to import useNavigate from react-router-dom at the top of your file
                            navigate(`/career`, {
                              state: {
                                jobTitle: job.title,
                                jobDescription: job.summary,
                              },
                            });
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerJob;
