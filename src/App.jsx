import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./Login";
import Applicants from "./Applicants";
import CompanyProfile from "./CompanyProfile";

const Dashboard = React.lazy(() => import("./Dashboard"));

import ApplicantPortal from "./applicant/ApplicantPortal";
import logoBlue from "./assets/RCCLogo-Blue.png";

// Client/Company Layout
const ClientLayout = ({ children }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</main>
    </div>
  </div>
);

// Applicant Layout
const ApplicantLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <main className="flex-1 container mx-auto p-4">{children}</main>
  </div>
);

// Landing page component
const LandingPage = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
    <header className="bg-white shadow-sm p-4">
      <div className="container mx-auto flex items-center">
        <img
          src={logoBlue}
          alt="RCC Colab Solutions"
          className="h-10 w-10 mr-3"
        />
        <h1 className="text-xl font-semibold text-gray-800">
          RCC Colab Solutions
        </h1>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome to our Portal
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Access our platform to manage your recruitment needs or track your
          application status.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1 transition-transform hover:transform hover:scale-105">
          <div className="bg-blue-600 h-2"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Client Portal
            </h3>
            <p className="text-gray-600 mb-6">
              Manage your recruitment process, review applications, and handle
              your company profile.
            </p>
            <a
              href="/client/login"
              className="block w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors"
            >
              Client Login
            </a>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex-1 transition-transform hover:transform hover:scale-105">
          <div className="bg-green-600 h-2"></div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Applicant Portal
            </h3>
            <p className="text-gray-600 mb-6">
              Track your application status, update your profile, and view
              available opportunities.
            </p>
            <a
              href="/applicant/portal"
              className="block w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-center transition-colors"
            >
              Applicant Login
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer className="bg-white shadow-inner p-6">
      <div className="container mx-auto text-center text-gray-500">
        <p>© 2024 RCC Colab Solutions. All rights reserved.</p>
        <div className="flex justify-center mt-3 space-x-4">
          <a href="#" className="text-gray-400 hover:text-gray-600">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-600">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
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

          {/* Applicant routes */}
          <Route
            path="/applicant/portal"
            element={
              <ApplicantLayout>
                <ApplicantPortal />
              </ApplicantLayout>
            }
          />

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
