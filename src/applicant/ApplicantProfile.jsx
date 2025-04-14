import React from "react";

const ApplicantProfile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-[#0A2472] p-10 pb-16 relative flex justify-center items-center mb-10">
            {/* Avatar positioned with relative values */}
            <div className="absolute bottom-0 transform translate-y-1/2">
              <div className="bg-white rounded-full p-2 w-16 h-16 flex items-center justify-center">
                <div className="bg-[#0A2472] rounded-full w-12 h-12 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Applicant Information */}
          <div className="p-4">
            <div className="text-center mb-4">
              <p className="text-gray-500 text-sm">Applicant Name</p>
              <p className="font-bold">Kent Cortiguerra</p>
            </div>

            {/* Application Details Grid */}
            <div className="grid grid-cols-3 text-center mb-40">
              <div className="border-r">
                <p className="text-gray-500 text-sm">Position</p>
                <p className="p-2"></p>
              </div>
              <div className="border-r">
                <p className="text-gray-500 text-sm">Date Applied</p>
                <p className="p-2"></p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="p-2"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfile;
