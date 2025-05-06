import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "./api/tokenizedaxios";

const CompanyProfile = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null); // State to store the response data
  const [error, setError] = useState(null); // State to handle errors
  // State for form inputs
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "",
    companyAddress: "",
    representative: "",
    email: "",
    contactNumber: "",
    status: "",
    cc: "",
    bcc: "",
  });

  // Format cc and bcc as comma-separated strings (but no comma if only 1)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get("/companyprofile");

        if (response.data.status_tokenized === "error") {
          localStorage.clear();
          navigate("/client/login");
        } else {
          const data = response.data.companydata;

          setCompanyInfo({
            companyName: data.company_name,
            representative: data.representative_name,
            email: data.company_email,
            contactNumber: data.company_phone,
            status: data.status,
            cc: data.cc,
            bcc: data.bcc,
          });
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Error fetching data");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({
      ...companyInfo,
      [name]: value,
    });
  };
  // here use this function to save the email cc and bcc
  const handleSubmit = async (type) => {
    try {
      const response = await axiosInstance.post("/updateemails", {
        type: type,
        cc: companyInfo.cc,
        bcc: companyInfo.bcc,
      });
      if (response.data.status_tokenized === "error") {
        localStorage.clear();
        navigate("/client/login");
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Error saving data");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Company Profile</h1>
        <p className="text-gray-600">
          Manage Your Company Information and Email Settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Company Card */}
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 mb-6">
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold">{companyInfo.companyName}</h2>
              <p className="text-gray-600">{companyInfo.companyAddress}</p>
            </div>

            <div className="flex justify-center mx-auto w-64 mt-8 py-3 px-4 bg-green-50 text-green-700 rounded-lg border border-green-100 transition-colors duration-300">
              <div className="flex items-center">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">
                  Account is {companyInfo.status}
                </span>
              </div>
            </div>
          </div>

          {/* Email Additional Information */}
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Email Additional Information
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Add CC</label>
              <input
                type="text"
                name="cc"
                value={companyInfo.cc}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter email addresses"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use comma (,) if more than one email
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => handleSubmit("email")}
                className="bg-blue-900 text-white font-medium py-2 px-10 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Company Information */}
          <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Company Information
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={companyInfo.companyName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Company Representative
              </label>
              <input
                type="text"
                name="representative"
                value={companyInfo.representative}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Representative Email
              </label>
              <input
                type="email"
                name="email"
                value={companyInfo.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Representative Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={companyInfo.contactNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
