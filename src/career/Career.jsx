import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import careerBackground from "../assets/Career.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ReCAPTCHA from "react-google-recaptcha";
import axiosInstance from "./../api/axios";

// Toast component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 transition-all duration-500 transform z-50">
      <div
        className={`rounded-lg shadow-lg px-6 py-4 ${
          type === "error"
            ? "bg-red-600 text-white"
            : type === "success"
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white"
        }`}
      >
        <div className="flex items-center space-x-3">
          <div className="shrink-0">
            {type === "error" ? (
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
            ) : type === "success" ? (
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
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

const Career = () => {
  const recaptchaRef = React.createRef();
  const navigate = useNavigate();
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const location = useLocation();
  const jobId = location.state?.jobId;
  const [jobData, setJobData] = useState(null);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const showToast = (message, type = "success") => {
    setToast({
      show: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      show: false,
    }));
  };

  useEffect(() => {
    const fetchJobPostSpecific = async (id) => {
      try {
        const response = await axiosInstance.get("/getjob/" + id);
        if (response.data.status_tokenized === "error") {
          localStorage.clear();
          navigate("/client/login");
        } else {
          setJobData(response.data.data);
        
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Error fetching data");
      }
    };

    const params = new URLSearchParams(window.location.search);
    const jobIdFromParams = params.get("job");
    const jobIdToUse = jobId || jobIdFromParams;

    if (jobIdToUse) {
      fetchJobPostSpecific(jobIdToUse);
    }
  }, [jobId, navigate]);

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
    priority: jobId,
    agreeToTerms: false,
  });

  const [cvFile, setCvFile] = useState(null);
  const [fileName, setFileName] = useState(
    "Browse file (.pdf, .doc, .docx up to 5MB)"
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Update form data state
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        alert("Please upload a PDF, DOC, or DOCX file.");
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 5MB.");
        return;
      }

      setCvFile(file);
      setFileName(file.name);
      setShowConfirmation(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = recaptchaRef.current.getValue();
    if (!token) {
      showToast("Please complete the reCAPTCHA challenge.", "error");
      setIsSubmitting(false);
      return;
    }

    if (!cvFile) {
      showToast("Please upload your CV.", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const cvFormData = new FormData();
      cvFormData.append("cv", cvFile);

      const uploadResponse = await axiosInstance.post("uploadcv", cvFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.data.status !== "success") {
        throw new Error("Failed to upload CV");
      }

      const applicationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        middleName: formData.middleName || "",
        suffix: formData.suffix || "",
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        linkedin: formData.linkedin || "",
        portfolio: formData.portfolio || "",
        github: formData.github || "",
        secondChoice: formData.secondChoice || "",
        thirdChoice: formData.thirdChoice || "",
        findSource: formData.findSource,
        priority: jobId,
        cv_url: uploadResponse.data.data.url,
        recaptchaToken: token,
      };

      const applicationResponse = await axiosInstance.post(
        "applyjob",
        applicationData
      );

      if (applicationResponse.data.status === "success") {
        const referenceCode = applicationResponse.data.data.reference_code;

        // Show success toast with reference code
        showToast(
          `Application submitted successfully! Your reference code is: ${referenceCode}`,
          "success"
        );

        setTimeout(() => {
          navigate("/", {
            state: {
              referenceCode: referenceCode,
            },
          });
        }, 6000);
      }
    } catch (error) {
      console.error("Error submitting application:", error);

      if (error.response && error.response.data) {
        

        if (error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors)
            .flat()
            .join("\n");
          showToast(`Validation errors: ${errorMessages}`, "error");
        } else if (error.response.data.message) {
          showToast(`Error: ${error.response.data.message}`, "error");
        } else {
          showToast(
            "An error occurred while submitting your application. Please try again later.",
            "error"
          );
        }
      } else {
        showToast(
          "An error occurred while submitting your application. Please try again later.",
          "error"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      <Header />

      {/* Toast notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

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
                {jobData ? jobData.jobtitle : "Loading..."}
              </h1>
              <p className="mt-6 text-white/80 max-w-xl text-base sm:text-lg text-justify leading-relaxed">
                {jobData ? jobData.jobdescription : "Loading..."}
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
                accept=".pdf"
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
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                ref={recaptchaRef}
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
              disabled={isSubmitting}
              className="w-full md:w-[697px] py-3 bg-orange-500 text-white rounded-md text-lg font-semibold hover:bg-orange-600 transition disabled:bg-orange-300"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
      <Footer />
      {/* CV Upload Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                CV Upload Successful
              </h3>
            </div>

            <p className="text-gray-600 mb-4">
              Your file <span className="font-medium">{fileName}</span> has been
              successfully uploaded.
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 bg-[#0A2472] text-white rounded hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;
