import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Login from "./Login";
import Applicants from "./Applicants";
import CompanyProfile from "./CompanyProfile";

// Content components
const Dashboard = React.lazy(() => import("./Dashboard"));

// Layout component that includes Sidebar and Header
const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Header />
      {children}
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/client/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/client/applicants"
            element={
              <Layout>
                <Applicants />
              </Layout>
            }
          />
          <Route
            path="/client/company-profile"
            element={
              <Layout>
                <CompanyProfile />
              </Layout>
            }
          />
          <Route path="*" element={<Login />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
}

export default App;
