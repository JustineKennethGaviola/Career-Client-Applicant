import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./Login";
import Applicants from "./Applicants";
import CompanyProfile from "./CompanyProfile";
import CareerJob from "./career/CareerJob";
import Career from "./career/Career";
import Messages from "./Messages";
import ReviewLogo from "./assets/Review.png";
import StatusLogo from "./assets/Status.png";
import CareerLogo from "./assets/Career-Job.png";

const Dashboard = React.lazy(() => import("./Dashboard"));

import ApplicantPortal from "./applicant/ApplicantPortal";
import logoBlue from "./assets/RCCLogo-White.png";
import useAutoLogout from "./hooks/useAutoLogout";
import DisableConsole from "./hooks/DisableConsole";
import Schedules from "./Schedule";

// Client/Company Layout
const ClientLayout = ({ children }) => {
  useAutoLogout("/client/login");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

// Applicant Layout
const ApplicantLayout = ({ children }) => {
  useAutoLogout("/applicant/portal");

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto p-4">{children}</main>
    </div>
  );
};

// Landing page component
const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <header className="bg-[#0A2472] shadow-sm p-4">
      <div className="container mx-auto flex items-center">
        <img
          src={logoBlue}
          alt="RCC Colab Solutions"
          className="h-16 w-15 mr-3"
        />
        <h1 className="text-xl font-bold text-white">RCC Colab Solutions</h1>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Client Portal Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex-1 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
          <div className="h-2 bg-[#0A2472]"></div>
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472]/20 to-transparent"></div>
            <img
              src={ReviewLogo}
              alt="Client Review Portal"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="p-2 bg-[#0A2472]/10 inline-block rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#0A2472]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Client Portal
            </h3>
            <p className="text-gray-600 mb-6">
              Manage your recruitment process, review applications, and handle
              your company profile.
            </p>
            <a
              href="/client/login"
              className="block w-full py-3 px-4 bg-[#0A2472] hover:bg-[#0A3487] text-white font-medium rounded-lg text-center transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Client Login
            </a>
          </div>
        </div>

        {/* Applicant Portal Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex-1 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
          <div className="h-2 bg-[#FB923C]"></div>
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-[#FB923C]/20 to-transparent"></div>
            <img
              src={StatusLogo}
              alt="Applicant Portal"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="p-2 bg-[#FB923C]/10 inline-block rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#FB923C]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Applicant Portal
            </h3>
            <p className="text-gray-600 mb-6">
              Track your application status, update your profile, and view
              available opportunities.
            </p>
            <a
              href="/applicant/portal"
              className="block w-full py-3 px-4 bg-[#FB923C] hover:bg-[#EA821C] text-white font-medium rounded-lg text-center transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Applicant Login
            </a>
          </div>
        </div>

        {/* Career Portal Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex-1 transition-all duration-300 hover:shadow-2xl hover:translate-y-[-8px] group">
          <div className="h-2 bg-[#0A2472]"></div>
          <div className="relative overflow-hidden h-48">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A2472]/20 to-transparent"></div>
            <img
              src={CareerLogo}
              alt="Career Portal"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-6">
            <div className="p-2 bg-[#0A2472]/10 inline-block rounded-lg mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#0A2472]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Career Portal
            </h3>
            <p className="text-gray-600 mb-6">
              Explore job opportunities, view details, and submit your
              applications for positions that match your skills.
            </p>
            <a
              href="/careerjob"
              className="block w-full py-3 px-4 bg-[#0A2472] hover:bg-[#0A2472] text-white font-medium rounded-lg text-center transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Browse Careers
            </a>
          </div>
        </div>
      </div>
    </main>
  </div>
);

// Not Found Page
const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Return to Home
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <React.Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-700 font-medium">Loading...</p>
            </div>
          </div>
        }
      >
        <Routes>
          {/* Client routes */}
          <Route path="/client/login" element={<Login />} />
          <Route
            path="/client/dashboard"
            element={
              <ClientLayout>
                <Dashboard />
              </ClientLayout>
            }
          />
          <Route
            path="/client/applicants"
            element={
              <ClientLayout>
                <Applicants />
              </ClientLayout>
            }
          />
          <Route
            path="/client/company-profile"
            element={
              <ClientLayout>
                <CompanyProfile />
              </ClientLayout>
            }
          />

          <Route
            path="/client/message"
            element={
              <ClientLayout>
                <Messages />
              </ClientLayout>
            }
          />

          <Route
            path="/client/schedules"
            element={
              <ClientLayout>
                <Schedules />
              </ClientLayout>
            }
          />

          {/* Applicant routes */}
          <Route
            path="/applicant/portal"
            element={
              <ApplicantLayout>
                <ApplicantPortal />
              </ApplicantLayout>
            }
          />

          <Route path="/careerjob" element={<CareerJob />} />
          <Route path="/career" element={<Career />} />

          {/* Root route */}
          <Route path="/" element={<LandingPage />} />

          {/* Not found route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
