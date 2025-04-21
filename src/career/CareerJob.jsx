import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import careerBackground from "../assets/Career.png";
import axiosInstance from "./../api/axios";

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
          <a
            href="#open-positions"
            className="mt-8 inline-block border-2 border-orange-500 text-white rounded-full px-8 py-3 hover:bg-orange-500 transition"
          >
            View Open Positions
          </a>
        </div>
      </div>

      {/* Job Search Section */}
      <section id="open-positions" className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-[#0A2472]">
            Join the RCC Colab Solution
          </h2>
          <p className="text-gray-600 mb-12 max-w-xl mx-auto text-justify leading-relaxed" />

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            <input
              type="text"
              placeholder="Search Job Title..."
              className="col-span-1 md:col-span-2 w-full p-3 border border-gray-300 rounded"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
            />

            <select
              className="w-full p-3 border border-gray-300 rounded bg-white"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
            >
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="office">Office</option>
            </select>

            <select
              className="w-full p-3 border border-gray-300 rounded bg-white"
              value={filters.workType}
              onChange={(e) =>
                setFilters({ ...filters, workType: e.target.value })
              }
            >
              <option value="">Work Type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
            </select>
          </div>

          {/* Job Listings */}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
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
                      {job.jobtitle}
                    </h3>
                    <p
                      className={`${
                        expandedJobId === index
                          ? "text-gray-600"
                          : "text-gray-600 group-hover:text-white/90"
                      } transition-colors`}
                    >
                      {job.jobdescription}
                    </p>
                  </div>
                  <div className="min-w-[200px]">
                    <p className="font-medium text-gray-700 group-hover:text-white">
                      Work Type
                    </p>
                    <p className="text-gray-600 group-hover:text-white/90">
                      {job.jobtype}
                    </p>
                    <p className="font-medium mt-3 text-gray-700 group-hover:text-white">
                      Location
                    </p>
                    <p className="text-gray-600 group-hover:text-white/90">
                      {job.joblocation}
                    </p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0 text-blue-800 group-hover:text-white">
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

                {/* Expanded job details section */}
                {expandedJobId === index && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-semibold mb-2 text-[#0A2472]">
                      Job Summary
                    </h4>
                    <p className="text-gray-700 whitespace-pre-line">
                      {job.others}
                    </p>
                    <div className="flex justify-end mt-6">
                      <button
                        className="bg-[#0A2472] text-white px-6 py-2 rounded hover:bg-blue-900 transition"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/career`, {
                            state: {
                              jobId: job.jobcode,
                            },
                          });
                        }}
                      >
                        Apply
                      </button>
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
