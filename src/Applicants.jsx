import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "./api/tokenizedaxios";

const Applicants = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsApplicant, setDetailsApplicant] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [resumeView, setResumeView] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [filters, setFilters] = useState({
    position: "All Positions",
    status: "All Statuses",
    dateApplied: "All Dates",
  });
  const [url, setUrl] = useState("");
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApplicantForStatus, setSelectedApplicantForStatus] =
    useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [remarks, setRemarks] = useState("");
  const [jobs, setJobs] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    title: "",
    attendees: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    locationType: "online",
  });

  const handleInterviewInputChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails({
      ...interviewDetails,
      [name]: value,
    });
  };

  const handleScheduleInterview = () => {
    // Add API call if there is a backend for schedule interview
    console.log("Scheduling interview:", interviewDetails);

    showToast("Interview scheduled successfully!");
    setShowInterviewModal(false);
  };

  const handleOpenInterviewModal = (applicant) => {
    setSelectedApplicantForStatus(applicant);
    setShowInterviewModal(true);
    setOpenDropdown(null);
  };

  const filteredApplicants = applicants.filter((applicant) => {
    // Search term filter
    const searchMatch =
      searchTerm === "" ||
      applicant.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (applicant.jobtitle &&
        applicant.jobtitle.toLowerCase().includes(searchTerm.toLowerCase()));

    // Position filter
    const positionMatch =
      filters.position === "All Positions" ||
      applicant.jobtitle === filters.position;

    // Status filter
    const statusMatch =
      filters.status === "All Statuses" ||
      applicant.applicant_status === filters.status;

    return searchMatch && positionMatch && statusMatch;
  });

  const handleRemarksChange = (e) => {
    setRemarks(e.target.value);
  };

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });

    // Automatically hide toast after 3 seconds
    setTimeout(() => {
      setToast({ ...toast, visible: false });
    }, 3000);
  };

  const handleOpenDetailsModal = (applicant) => {
    setDetailsApplicant(applicant);
    setShowDetailsModal(true);
    setOpenDropdown(null);
  };

  const handleRowClick = async (applicant) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/getapplicantstatus", {
        applicant_id: applicant.id,
        priority_job_id: applicant.priority_job_id,
      });

      if (response.data.status_tokenized === "error") {
        localStorage.clear();
        navigate("/client/login");
      } else {
        setStatuses(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching status:", err);
    } finally {
      setIsLoading(false);
      handleOpenDetailsModal(applicant);
    }
  };

  // Fetch data from the database
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/selectapplicants");

        if (response.data.status_tokenized === "error") {
          localStorage.clear();
          navigate("/client/login");
        } else {
          const data = response.data.applicants;
          setApplicants(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await axiosInstance.get("/positions");

        if (response.data.status_tokenized === "error") {
          localStorage.clear();
          navigate("/client/login");
        } else {
          const data = response.data.jobpostings;

          setJobs(data);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchJobData();
  }, [navigate]);

  useEffect(() => {
    if (detailsApplicant?.id) {
      const fetchResumeUrl = async () => {
        try {
          const response = await axiosInstance.get(
            `/view-resume/${detailsApplicant.id}`
          );

          if (response.data.status_tokenized === "error") {
            localStorage.clear();
            navigate("/client/login");
          } else {
            setUrl(response.data.url);
          }
        } catch (err) {
          console.error("Error fetching resume URL:", err);
        }
      };

      fetchResumeUrl(); // <- move this inside the if block
    }
  }, [detailsApplicant?.id, navigate]);

  // Status badge styles
  const getStatusBadgeClasses = (statusType) => {
    switch (statusType) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Shortlisted":
        return "bg-yellow-100 text-yellow-800";
      case "For Interview":
        return "bg-purple-100 text-purple-800";
      case "For Assessment":
        return "bg-indigo-100 text-indigo-800";
      case "Waiting for Feedback":
        return "bg-orange-100 text-orange-800";
      case "Waiting for Job Offer":
        return "bg-green-100 text-green-800";
      case "Hired":
        return "bg-emerald-100 text-emerald-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Decline":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const downloadResume = async (applicantId) => {
    try {
      const response = await axiosInstance.get(url, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let filename = "resume.pdf";

      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch.length === 2) filename = filenameMatch[1];
      }

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading resume:", error);
      alert("Failed to download resume. Please try again later.");
    }
  };

  const requestResume = (applicantId) => {
    alert(
      `A resume request will be sent to ${detailsApplicant.firstname} ${detailsApplicant.lastname}.`
    );
  };

  const handleOpenStatusModal = (applicant) => {
    setSelectedApplicantForStatus(applicant);
    setNewStatus(applicant.status);
    setShowStatusModal(true);
    setOpenDropdown(null);
  };

  const handleOpenEmailModal = (applicant) => {
    setSelectedApplicant(applicant);
    setShowEmailModal(true);
    setOpenDropdown(null);
  };

  const handleFilterChange = (e, filterType) => {
    setFilters({
      ...filters,
      [filterType]: e.target.value,
    });
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setOpenDropdown(null);
    }
  };

  const handleStatusUpdate = async (e) => {
    setIsUpdatingStatus(true);

    try {
      const updateapplicantresponse = await axiosInstance.post(
        "/updateapplicant",
        {
          id: selectedApplicantForStatus.id,
          status: newStatus,
          remarks: remarks,
        }
      );

      setShowStatusModal(false);

      showToast(
        `Status for ${selectedApplicantForStatus.firstname} updated successfully!`
      );

      const updatedApplicants = applicants.map((app) => {
        if (app.id === selectedApplicantForStatus.id) {
          return { ...app, applicant_status: newStatus };
        }
        return app;
      });

      setApplicants(updatedApplicants);

      setNewStatus("");
      setRemarks("");
      setSelectedApplicantForStatus(null);
    } catch (error) {
      console.error("Error updating status:", error);
      showToast("Failed to update status. Please try again.", "error");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Applicants</h1>
        <p className="text-gray-600">
          Review and Manage Candidates for your Job Listings
        </p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {/* Filter Group */}
        <div className="flex flex-wrap gap-4">
          {/* Job Position Filter */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Position
            </label>
            <div className="relative">
              <select
                value={filters.position}
                onChange={(e) => handleFilterChange(e, "position")}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option>All Positions</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.jobtitle}>
                    {job.jobtitle}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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

          {/* Status Filter */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative">
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange(e, "status")}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option>All Statuses</option>
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="For Interview">For Interview</option>
                <option value="For Assessment">For Assessment</option>
                <option value="Waiting for Feedback">
                  Waiting for Feedback
                </option>
                <option value="Waiting for Job Offer">
                  Waiting for Job Offer
                </option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
                <option value="Decline">Decline</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
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
        </div>

        {/* Search Bar */}
        <div className="relative mt-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search Applicants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-96 bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Applicants Table */}
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-6">
        {filteredApplicants.length > 0 ? (
          <div>
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-1 text-sm font-medium text-blue-500">
                    Applicant
                  </th>
                  <th className="text-center py-3 px-1 text-sm font-medium text-blue-500">
                    Job Position
                  </th>
                  <th className="text-center py-3 px-1 text-sm font-medium text-blue-500">
                    Date Applied
                  </th>
                  <th className="text-center py-3 px-1 text-sm font-medium text-blue-500">
                    Status
                  </th>
                  <th className="text-center py-3 px-1 text-sm font-medium text-blue-500 w-20">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredApplicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleRowClick(applicant)}
                  >
                    <td className="py-3 px-1">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                          {applicant.firstname.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {applicant.firstname + " " + applicant.lastname}
                          </div>
                          <div className="text-xs text-gray-500">
                            {applicant.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-1 text-sm text-center">
                      {applicant.jobtitle}
                    </td>
                    <td className="py-3 px-1 text-sm text-center">
                      {applicant.created_at.split("T")[0]}
                    </td>
                    <td className="py-3 px-1 text-center">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(
                          applicant.applicant_status
                        )}`}
                      >
                        {applicant.applicant_status}
                      </span>
                    </td>
                    <td className="py-3 px-1 text-center relative dropdown-container">
                      <button
                        className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDropdown(applicant.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                      <div
                        className={`${
                          openDropdown === applicant.id ? "block" : "hidden"
                        } absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-1 text-left`}
                      >
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenStatusModal(applicant);
                          }}
                        >
                          Update Status
                        </a>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleOpenInterviewModal(applicant);
                          }}
                        >
                          Schedule Interview
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-1">
              No applicants found
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              {searchTerm ||
              filters.position !== "All Positions" ||
              filters.status !== "All Statuses"
                ? "No applicants match your current filters. Try adjusting your search criteria."
                : "There are no applicants in the system yet. They will appear here once candidates apply for your job postings."}
            </p>
            {(searchTerm ||
              filters.position !== "All Positions" ||
              filters.status !== "All Statuses") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilters({
                    position: "All Positions",
                    status: "All Statuses",
                    dateApplied: "All Dates",
                  });
                }}
                className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Email Modal */}
      {showEmailModal && selectedApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Send Email to {selectedApplicant.name}
              </h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">To</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                value={selectedApplicant.email}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter email subject"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 h-40"
                placeholder="Type your message here..."
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Status Update Modal */}
      {showStatusModal && selectedApplicantForStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Update Status for{" "}
                {selectedApplicantForStatus.firstname +
                  " " +
                  selectedApplicantForStatus.lastname}
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <input
                type="hidden"
                name="id"
                value={selectedApplicantForStatus.id}
              />
              <label className="block text-sm font-medium mb-1">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" selected disabled>
                  Select Status
                </option>
                <option value="New">New</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="For Interview">For Interview</option>
                <option value="For Assessment">For Assessment</option>
                <option value="Waiting for Feedback">
                  Waiting for Feedback
                </option>
                <option value="Waiting for Job Offer">
                  Waiting for Job Offer
                </option>
                <option value="Hired">Hired</option>
                <option value="Rejected">Rejected</option>
                <option value="Decline">Decline</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                value={remarks}
                onChange={handleRemarksChange}
                placeholder="Add comments or notes about this status change..."
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 h-24"
              ></textarea>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={isUpdatingStatus}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 disabled:bg-blue-400 flex items-center justify-center"
              >
                {isUpdatingStatus ? (
                  <>
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
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interview Modal */}
      {showInterviewModal && selectedApplicantForStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Schedule Interview for{" "}
                {selectedApplicantForStatus.firstname +
                  " " +
                  selectedApplicantForStatus.lastname}
              </h3>
              <button
                onClick={() => setShowInterviewModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Interview Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={interviewDetails.title}
                  onChange={handleInterviewInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., Technical Interview Round 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Attendees
                </label>
                <input
                  type="text"
                  name="attendees"
                  value={interviewDetails.attendees}
                  onChange={handleInterviewInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  placeholder="e.g., HR Manager, Team Lead"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple attendees with commas
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={interviewDetails.startDate}
                    onChange={handleInterviewInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={interviewDetails.startTime}
                    onChange={handleInterviewInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={interviewDetails.endDate}
                    onChange={handleInterviewInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={interviewDetails.endTime}
                    onChange={handleInterviewInputChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Interview Type
                </label>
                <div className="flex space-x-4 mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="online"
                      checked={interviewDetails.locationType === "online"}
                      onChange={handleInterviewInputChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm">Online</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="locationType"
                      value="physical"
                      checked={interviewDetails.locationType === "physical"}
                      onChange={handleInterviewInputChange}
                      className="h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm">Physical</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowInterviewModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleInterview}
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Applicant Details Modal */}
      {showDetailsModal && detailsApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {resumeView ? "Applicant Resume" : "Applicant Details"}
              </h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setResumeView(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {!resumeView ? (
              // Applicant details view
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2 flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {detailsApplicant.firstname.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      {detailsApplicant.firstname +
                        " " +
                        detailsApplicant.lastname}
                    </h4>
                    <p className="text-gray-500">{detailsApplicant.email}</p>
                    <div className="mt-1">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(
                          detailsApplicant.applicant_status
                        )}`}
                      >
                        {detailsApplicant.applicant_status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">
                      Job Position
                    </h5>
                    <p className="font-medium">{detailsApplicant.jobtitle}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-500">
                      Date Applied
                    </h5>
                    <p>{detailsApplicant.created_at.split("T")[0]}</p>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium text-gray-500">Phone</h5>
                    <p>{detailsApplicant.contact_number || "Not provided"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500">
                      Address
                    </h5>
                    <p>{detailsApplicant.address || "Not provided"}</p>
                  </div>
                </div>

                {/* Application Timeline */}
                <div className="col-span-2 mt-4">
                  <h5 className="text-sm font-medium text-gray-500 mb-2">
                    Application Timeline
                  </h5>
                  <div className="border rounded-md p-4 bg-gray-50 h-60 overflow-y-auto">
                    <div className="space-y-4">
                      {statuses.map((status, index) => {
                        const isLastEvent = index === statuses.length - 1;

                        return (
                          <div className="flex" key={status.id || index}>
                            <div className="flex-none mr-3">
                              <div
                                className={`w-8 h-8 ${
                                  status.iconBg || "bg-gray-200"
                                } rounded-full flex items-center justify-center`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-blue-600"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>

                              {!isLastEvent && (
                                <div className="h-full border-l-2 border-gray-200 ml-4 mt-2"></div>
                              )}
                            </div>
                            <div className={`${!isLastEvent ? "pb-5" : ""}`}>
                              <p className="text-sm font-medium">
                                {status.status}
                              </p>
                              <p className="text-xs mt-1 text-gray-600">
                                Update Status
                              </p>
                              {status.remarks && (
                                <p className="text-sm mt-1 text-gray-600">
                                  {status.remarks}
                                </p>
                              )}
                              {status.date && (
                                <p className="text-xs text-gray-500">
                                  {status.date}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 border-t pt-4">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setResumeView(true)}
                      className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
                    >
                      View Resume
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Resume view
              <div className="flex flex-col h-full">
                <div className="border-b pb-4 mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium">
                      {detailsApplicant.firstname +
                        " " +
                        detailsApplicant.lastname}
                      's Resume
                    </h4>
                    <p className="text-sm text-gray-500">
                      Applied for: {detailsApplicant.jobtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setResumeView(false)}
                    className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 text-sm flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Back to Details
                  </button>
                </div>

                <div className="flex-grow h-[60vh] border rounded-lg overflow-hidden">
                  {url ? (
                    <iframe
                      src={url}
                      className="w-full h-full"
                      title={`${detailsApplicant.firstname}'s Resume`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <div className="text-center p-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-gray-600 mb-2">
                          Resume not available
                        </p>
                        <p className="text-sm text-gray-500">
                          The applicant has not uploaded a resume or the file
                          cannot be displayed.
                        </p>
                        <button
                          onClick={() => requestResume(detailsApplicant.id)}
                          className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm"
                        >
                          Request Resume
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {toast.visible && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg z-50 flex items-center space-x-2 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
        >
          {toast.type === "success" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {toast.type === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default Applicants;
