import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import careerBackground from "../assets/Career.png";
import axiosInstance from "./../api/axios";
import DOMPurify from "dompurify";
import {
  FaBriefcase,
  FaUser,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

const CareerJob = () => {
  const navigate = useNavigate();
  const [jobListings, setJobListings] = useState([]);
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [filters, setFilters] = useState({
    searchTerm: "",
    location: "",
    workType: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobPost = async () => {
      try {
        const response = await axiosInstance.get("/getjob");
        if (response.data.status_tokenized === "error") {
          localStorage.clear();
          navigate("/client/login");
        } else {
          setJobListings(response.data.data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Error fetching data");
      }
    };

    fetchJobPost();
  }, [navigate]);

  const toggleJobExpansion = (index) => {
    setExpandedJobId(expandedJobId === index ? null : index);
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = job.jobtitle
      .toLowerCase()
      .includes(filters.searchTerm.toLowerCase());
    const matchesLocation = filters.joblocation
      ? job.location.toLowerCase().includes(filters.location.toLowerCase())
      : true;
    const matchesWorkType = filters.jobtype
      ? job.type.toLowerCase() === filters.jobtype.toLowerCase()
      : true;
    return matchesSearch && matchesLocation && matchesWorkType;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <div
        className="relative bg-[#0A2472] overflow-hidden"
        style={{ clipPath: "polygon(100% 1%, 100% 85%, 50% 100%, 0 85%, 0 0)" }}
      >
        <img
          src={careerBackground}
          alt="Background"
          className="absolute w-full h-full object-cover object-center opacity-20"
        />
        <div className="relative z-10 max-w-screen-xl mx-auto flex flex-col items-center justify-center pt-[150px] pb-[150px] px-6 lg:px-0">
          <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-semibold text-center">
            Grow your Career at RCC Colab Solutions
          </h1>
          <p className="text-white text-center mt-4 max-w-2xl opacity-90">
            Join our dynamic team and be part of innovative solutions that shape
            the future. We offer exciting opportunities for professional growth
            in a collaborative environment.
          </p>
          <a
            href="#open-positions"
            className="mt-8 inline-block border-2 border-orange-500 text-white rounded-full px-8 py-3 hover:bg-orange-500 transition"
          >
            View Open Positions
          </a>
        </div>
      </div>

      {/* Job Search Section - Updated with Company Colors */}
      <section
        id="open-positions"
        className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with Modern Typography */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#11A7C6] to-[#0A2472] rounded-full mb-6">
              <FaBriefcase className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#0A2472] to-[#0891B2] bg-clip-text text-transparent mb-4">
              Join the RCC Colab Solution
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              We're looking for talented individuals who are passionate about
              technology and innovation. Explore our current openings below and
              take the next step in your professional journey with us.
            </p>
          </div>

          {/* Advanced Search Interface */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Input with Icon */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search positions, skills, or keywords..."
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#11A7C6] focus:ring-4 focus:ring-[#11A7C6]/20 transition-all outline-none text-gray-700 placeholder-gray-400"
                  value={filters.searchTerm}
                  onChange={(e) =>
                    setFilters({ ...filters, searchTerm: e.target.value })
                  }
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <select
                  className="w-full lg:w-48 pl-12 pr-8 py-4 border-2 border-gray-200 rounded-xl focus:border-[#11A7C6] focus:ring-4 focus:ring-[#11A7C6]/20 transition-all outline-none appearance-none bg-white text-gray-700"
                  value={filters.location}
                  onChange={(e) =>
                    setFilters({ ...filters, location: e.target.value })
                  }
                >
                  <option value="">All Locations</option>
                  <option value="remote">🌐 Remote</option>
                  <option value="office">🏢 On-site</option>
                  <option value="hybrid">🔄 Hybrid</option>
                </select>
              </div>

              {/* Work Type Filter */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <select
                  className="w-full lg:w-48 pl-12 pr-8 py-4 border-2 border-gray-200 rounded-xl focus:border-[#11A7C6] focus:ring-4 focus:ring-[#11A7C6]/20 transition-all outline-none appearance-none bg-white text-gray-700"
                  value={filters.workType}
                  onChange={(e) =>
                    setFilters({ ...filters, workType: e.target.value })
                  }
                >
                  <option value="">All Types</option>
                  <option value="full-time">⏰ Full-time</option>
                  <option value="part-time">🕐 Part-time</option>
                  <option value="contract">📝 Contract</option>
                  <option value="internship">🎓 Internship</option>
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-gray-600 text-sm">
                <span className="font-semibold text-[#11A7C6]">
                  {filteredJobs.length}
                </span>{" "}
                positions found
                {filters.searchTerm && (
                  <span>
                    {" "}
                    for "
                    <span className="font-medium">{filters.searchTerm}</span>"
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-400 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Job Cards Grid */}
          <div className="grid gap-8">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No positions found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or check back later for new
                  opportunities.
                </p>
                <button
                  onClick={() =>
                    setFilters({ searchTerm: "", location: "", workType: "" })
                  }
                  className="inline-flex items-center px-6 py-3 bg-[#11A7C6] text-white rounded-lg hover:bg-[#0A2472] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 ${
                    expandedJobId === index
                      ? "ring-2 ring-[#11A7C6]/30 shadow-2xl"
                      : ""
                  }`}
                >
                  {/* Job Card Header */}
                  <div
                    className="p-8 cursor-pointer"
                    onClick={() => toggleJobExpansion(index)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      {/* Job Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-[#11A7C6] to-[#0A2472] rounded-2xl flex items-center justify-center flex-shrink-0">
                            <FaUser className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-[#0A2472] mb-3 group-hover:text-[#11A7C6] transition-colors">
                              {job.jobtitle}
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed line-clamp-2">
                              {job.jobdescription}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Job Meta Info */}
                      <div className="flex flex-col lg:items-end gap-4">
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center px-4 py-2 bg-[#11A7C6]/10 text-[#0A2472] rounded-full text-sm font-medium">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            {job.jobtype}
                          </span>
                          <span className="inline-flex items-center px-4 py-2 bg-[#FB923C]/10 text-[#FB923C] rounded-full text-sm font-medium">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            {job.joblocation}
                          </span>
                        </div>

                        {/* Expand Button */}
                        <button className="inline-flex items-center text-[#11A7C6] hover:text-[#0A2472] font-medium transition-colors">
                          <span className="mr-2">
                            {expandedJobId === index
                              ? "Show Less"
                              : "View Details"}
                          </span>
                          <svg
                            className={`w-5 h-5 transition-transform duration-200 ${
                              expandedJobId === index ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedJobId === index && (
                    <div className="px-8 pb-8">
                      <div className="pt-6 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-[#11A7C6]/10 to-[#0A2472]/10 rounded-xl p-6 mb-6">
                          <h4 className="text-xl font-bold text-[#0A2472] mb-4 flex items-center">
                            <FaClipboardList className="w-6 h-6 mr-3 text-[#11A7C6]" />
                            Job Overview
                          </h4>

                          <div
                            className="prose prose-gray max-w-none text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(job.others),
                            }}
                          />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end">
                          <button
                            className="px-8 py-3 bg-gradient-to-r from-[#11A7C6] to-[#0A2472] text-white rounded-xl hover:from-[#0A2472] hover:to-[#11A7C6] transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/career`, {
                                state: {
                                  jobId: job.jobcode,
                                },
                              });
                            }}
                          >
                            <FaFileAlt className="w-5 h-5 inline mr-2" />
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareerJob;
