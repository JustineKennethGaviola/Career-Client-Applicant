import React, { useState, useEffect } from "react";
import axiosInstance from "./api/tokenizedaxios";
import { Navigate, useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null); // State to store the response data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard');

        // Display the response data in the console (for debugging purposes)
        

        // Check if the status_tokenized is 'error'
        if (response.data.status_tokenized === 'error') {
          // Clear local storage to log the user out
          localStorage.clear();

          // Redirect to login page
          navigate('/client/login');
        } else {
          // Store the response data in the state
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Error fetching data'); // Set error state if something goes wrong
      }
    };

    fetchDashboardData();
  }, [navigate]);
  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1">
        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Cards */}
          <div className="relative h-96 mb-1">
            {/* New CV Card */}
            <div
              className="absolute shadow-lg border border-gray-300 bg-white rounded-lg p-4 flex items-center w-80 h-28"
              style={{ top: "20px", left: "30px" }}
            >
              <div className="p-3 rounded-lg bg-blue-50 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">New CV</div>
                <div className="text-2xl font-bold">187</div>
              </div>
            </div>

            {/* Pending Card */}
            <div
              className="absolute shadow-lg border border-gray-300 bg-white rounded-lg p-4 flex items-center w-80 h-28"
              style={{ top: "20px", left: "420px" }}
            >
              <div className="p-3 rounded-lg bg-blue-50 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
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
              </div>
              <div>
                <div className="text-sm text-gray-500">Pending</div>
                <div className="text-2xl font-bold">387</div>
              </div>
            </div>

            {/* For Job Offer Card */}
            <div
              className="absolute shadow-lg border border-gray-300 bg-white rounded-lg p-4 flex items-center w-80 h-28"
              style={{ top: "20px", left: "800px" }}
            >
              <div className="p-3 rounded-lg bg-blue-50 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">For Job Offer</div>
                <div className="text-2xl font-bold">20</div>
              </div>
            </div>

            {/* Hired Card */}
            <div
              className="absolute shadow-lg border border-gray-300 bg-white rounded-lg p-4 flex items-center w-80 h-28"
              style={{ top: "180px", left: "200px" }}
            >
              <div className="p-3 rounded-lg bg-blue-50 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Hired</div>
                <div className="text-2xl font-bold">90</div>
              </div>
            </div>

            {/* Declined Card */}
            <div
              className="absolute shadow-lg border border-gray-300 bg-white rounded-lg p-4 flex items-center w-80 h-28"
              style={{ top: "180px", left: "600px" }}
            >
              <div className="p-3 rounded-lg bg-red-50 mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="text-sm text-gray-500">Declined</div>
                <div className="text-2xl font-bold">70</div>
              </div>
            </div>
          </div>

          {/* Applicants Trends */}
          <div className="bg-white -mt-8 shadow-lg border border-gray-300 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Applicants Trends
              </h2>
              <a href="#" className="text-blue-500 text-sm hover:underline">
                View All
              </a>
            </div>

            {/* Applicants Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                      Position
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                      Department
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                      Location
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-blue-500">
                      Applications
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table 1 */}
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm">
                      Senior Frontend Developer
                    </td>
                    <td className="py-3 px-4 text-sm">Engineering</td>
                    <td className="py-3 px-4 text-sm">Remote</td>
                    <td className="py-3 px-4 text-sm">45</td>
                  </tr>

                  {/* Table 2 */}
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm">UI/UX Designer</td>
                    <td className="py-3 px-4 text-sm">Design</td>
                    <td className="py-3 px-4 text-sm">Remote</td>
                    <td className="py-3 px-4 text-sm">28</td>
                  </tr>

                  {/* Table 3 */}
                  <tr className="border-b">
                    <td className="py-3 px-4 text-sm">IT Support</td>
                    <td className="py-3 px-4 text-sm">IT</td>
                    <td className="py-3 px-4 text-sm">Remote</td>
                    <td className="py-3 px-4 text-sm">17</td>
                  </tr>

                  {/* Table 4 */}
                  <tr>
                    <td className="py-3 px-4 text-sm">Backend Developer</td>
                    <td className="py-3 px-4 text-sm">Engineering</td>
                    <td className="py-3 px-4 text-sm">Remote</td>
                    <td className="py-3 px-4 text-sm">32</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
