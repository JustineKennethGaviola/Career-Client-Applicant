import React, { useState, useEffect } from "react";
import careerBackground from "../assets/Career.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import { useLocation } from "react-router-dom";

const Career = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    suffix: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    portfolio: "",
    github: "",
    secondChoice: "",
    thirdChoice: "",
    findSource: "",
    agreeToTerms: false,
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const location = useLocation();
  const jobTitle = location.state?.jobTitle || "Back End Software Engineer";
  const jobDescription =
    location.state?.jobDescription ||
    "Lorem ipsum dolor sit amet, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.";

  const [cvFile, setCvFile] = useState(null);
  const [fileName, setFileName] = useState(
    "Browse file (.pdf, .doc, .docx up to 5MB)"
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCvFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA");
      return;
    }

    // Rest of your form submission logic
    console.log("Form Data:", formData);
    console.log("CV File:", cvFile);
    console.log("reCAPTCHA:", recaptchaValue);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <Header />
      {/* Hero Section with Job Title and Summary */}
      <div
        className="relative bg-[#0A2472] overflow-hidden"
        style={{ clipPath: "polygon(100% 1%, 100% 85%, 50% 100%, 0 85%, 0 0)" }}
      >
        {/* Image with opacity */}
        <img
          src={careerBackground}
          alt="Background"
          className="absolute w-full h-full object-cover object-center opacity-20"
        />

        <div className="relative z-10">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col items-center justify-center pt-[150px] pb-[150px] h-fit px-6 lg:px-0">
              <h1 className="text-white text-2xl sm:text-4xl lg:text-5xl font-semibold text-center">
                {jobTitle}
              </h1>
              <p className="mt-6 text-white/80 max-w-xl text-base sm:text-lg text-justify leading-relaxed">
                {jobDescription}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Fill out the Form</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="hidden" name="job_id" value="1" />

          {/* Row 1 - Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="middleName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Middle name (Optional)
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Middle name"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="suffix"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Suffix
              </label>
              <div className="relative">
                <select
                  id="suffix"
                  name="suffix"
                  className="w-full p-2 border border-gray-300 rounded appearance-none"
                  value={formData.suffix}
                  onChange={handleInputChange}
                >
                  <option value="">Select Suffix</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
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

          {/* Row 2 - Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Contact No."
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* Row 3 - Professional Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                LinkedIn Profile (Optional)
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Paste link here"
                value={formData.linkedin}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="portfolio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Portfolio (Optional)
              </label>
              <input
                type="text"
                id="portfolio"
                name="portfolio"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Paste link here"
                value={formData.portfolio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                GitHub Profile (Optional)
              </label>
              <input
                type="text"
                id="github"
                name="github"
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Paste link here"
                value={formData.github}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 4 - Position Preferences and Find Source */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Second Choice Position */}
            <div>
              <label
                htmlFor="secondChoice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Second Choice Position
              </label>
              <div className="relative">
                <select
                  id="secondChoice"
                  name="secondChoice"
                  className="w-full p-2 border border-gray-300 rounded appearance-none"
                  value={formData.secondChoice}
                  onChange={handleInputChange}
                >
                  <option value="">Select Position</option>
                  <option value="2">Frontend Developer</option>
                  <option value="3">Backend Developer</option>
                  <option value="4">UX/UI Designer</option>
                  <option value="5">DevOps Engineer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
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

            {/* Third Choice Position */}
            <div>
              <label
                htmlFor="thirdChoice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Third Choice Position
              </label>
              <div className="relative">
                <select
                  id="thirdChoice"
                  name="thirdChoice"
                  className="w-full p-2 border border-gray-300 rounded appearance-none"
                  value={formData.thirdChoice}
                  onChange={handleInputChange}
                >
                  <option value="">Select Position</option>
                  <option value="2">Frontend Developer</option>
                  <option value="3">Backend Developer</option>
                  <option value="4">UX/UI Designer</option>
                  <option value="5">DevOps Engineer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
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

            {/* Where did you find us */}
            <div>
              <label
                htmlFor="findSource"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Where did you find us? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="findSource"
                  name="findSource"
                  className="w-full p-2 border border-gray-300 rounded appearance-none"
                  value={formData.findSource}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Source</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Google">Google</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-400"
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

          {/* CV Upload */}
          <div className="mb-8">
            <div
              className="border border-dashed border-gray-300 rounded p-8 text-center cursor-pointer"
              onClick={() => document.getElementById("cv").click()}
            >
              <input
                type="file"
                id="cv"
                name="cv"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <div className="flex flex-col items-center">
                <div className="text-gray-500 mb-2">
                  <svg
                    className="w-8 h-8 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-[#0A2472] font-medium text-lg">
                  Upload CV <span className="text-red-500">*</span>
                </h3>
                <p className="text-gray-500 text-sm mt-1" id="file-name">
                  {fileName}
                </p>
              </div>
            </div>
          </div>

          {/* reCAPTCHA and Terms */}
          <div className="mb-6">
            {/* reCAPTCHA placeholder - would need to use a React reCAPTCHA component */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual site key
                onChange={handleRecaptchaChange}
              />
            </div>

            {/* Terms & Conditions - Centered */}
            <div className="mt-6 flex items-center justify-center mb-6">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 text-sm text-gray-600"
              >
                I accept Terms & Condition and Privacy Policy{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:w-[697px] py-3 bg-orange-500 text-white rounded-md text-lg font-semibold hover:bg-orange-600 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Career;
