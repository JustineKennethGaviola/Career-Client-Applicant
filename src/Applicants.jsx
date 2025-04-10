import React, { useState } from "react";

const Applicants = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    position: "All Positions",
    status: "All Statuses",
    dateApplied: "All Dates",
  });
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedApplicantForStatus, setSelectedApplicantForStatus] =
    useState(null);
  const [newStatus, setNewStatus] = useState("");

  // Sample applicant data
  const applicants = [
    {
      id: 1,
      name: "Applicant 1",
      email: "applicant1@gmail.com",
      position: "UI/UX Designer",
      dateApplied: "03/26/2019",
      status: "Shortlisted",
      statusType: "shortlisted",
    },
    {
      id: 2,
      name: "Applicant 2",
      email: "applicant2@gmail.com",
      position: "UI/UX Designer",
      dateApplied: "03/26/2019",
      status: "Rejected",
      statusType: "rejected",
    },
    {
      id: 3,
      name: "Applicant 3",
      email: "applicant3@gmail.com",
      position: "UI/UX Designer",
      dateApplied: "03/26/2019",
      status: "New",
      statusType: "new",
    },
    {
      id: 4,
      name: "Applicant 4",
      email: "applicant4@gmail.com",
      position: "UI/UX Designer",
      dateApplied: "03/26/2019",
      status: "Waiting for feedback",
      statusType: "waiting",
    },
  ];

  // Status badge styles
  const getStatusBadgeClasses = (statusType) => {
    switch (statusType) {
      case "waiting":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "new":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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

  // Close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-container")) {
      setOpenDropdown(null);
    }
  };

  const handleStatusUpdate = () => {
    // Sample API Call
    console.log(
      `Updating status for ${selectedApplicantForStatus.name} to ${newStatus}`
    );

    // Close the modal
    setShowStatusModal(false);
  };

  // Add event listener to close dropdowns when clicking outside
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
                <option>UI/UX Designer</option>
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>IT Support</option>
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
                <option>New</option>
                <option>Waiting for feedback</option>
                <option>Rejected</option>
                <option>Shortlisted</option>
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

          {/* Date Applied Filter */}
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Applied
            </label>
            <div className="relative">
              <select
                value={filters.dateApplied}
                onChange={(e) => handleFilterChange(e, "dateApplied")}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option>All Dates</option>
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>This Month</option>
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
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-1">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                        {applicant.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          {applicant.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {applicant.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-1 text-sm text-center">
                    {applicant.position}
                  </td>
                  <td className="py-3 px-1 text-sm text-center">
                    {applicant.dateApplied}
                  </td>
                  <td className="py-3 px-1 text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeClasses(
                        applicant.statusType
                      )}`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="py-3 px-1 text-center relative dropdown-container">
                    <button
                      className="text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => toggleDropdown(applicant.id)}
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
                          handleOpenEmailModal(applicant);
                        }}
                      >
                        Send Email
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Download Resume
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenStatusModal(applicant);
                        }}
                      >
                        Update Status
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                Update Status for {selectedApplicantForStatus.name}
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

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="block w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="New">New</option>
                <option value="Waiting for feedback">
                  Waiting for feedback
                </option>
                <option value="Rejected">Rejected</option>
                <option value="Shortlisted">Shortlisted</option>
              </select>
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
                className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applicants;
