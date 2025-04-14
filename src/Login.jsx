import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from './api/axios';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [error, setError] = useState('');
  const recaptchaRef = React.createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = recaptchaRef.current.getValue();
      if (!token) {
        alert("Please complete the reCAPTCHA challenge.");
        return;
      }
      const response = await axios.post('/loginfront', {
        email: email,
        code: code,
        token: token
      });

      navigate('/client/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };
  
  return (
    <div className="flex h-screen">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/src/assets/RCCLogo-Blue.png"
              alt="RCC Logo"
              className="h-16"
            />
          </div>

          {/* Login Form */}
          <div className="mb-8">
            <h1 className="text-center text-3xl font-bold text-gray-900 mb-2">
              Login to your account.
            </h1>
            <p className="text-center text-gray-600">
              Hello, welcome back to your account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Company Email */}
            <div className="relative h-14 mb-2">
              <input
                type="email"
                placeholder="example@gmail.com"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="email"
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
              >
                Company Email
              </label>
            </div>

            {/* Sign in code */}
            <div className="relative h-14 mt-6">
              <input
                type="password"
                placeholder="Sign In Code"
                name="code"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="shadow-lg peer h-14 w-full bg-transparent outline-none px-4 pt-2 text-base rounded-xl bg-white border border-gray-300 focus:border-[#0A2472] focus:shadow-md transition-all placeholder-transparent focus:placeholder-gray-400"
              />
              <label
                htmlFor="code"
                className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 text-gray-600 peer-focus:top-0 peer-focus:left-3 peer-focus:text-sm peer-focus:text-[#0A2472] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#0A2472] duration-150"
              >
                Sign in code
              </label>
            </div>

            {/* reCAPTCHA */}
            <div className="my-4">
                  <ReCAPTCHA
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              ref={recaptchaRef}
            />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="w-60 bg-[#0A2472] hover:bg-blue-950 text-white font-medium py-3 px-4 rounded-2xl transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div
        className="hidden md:block md:w-1/2 relative bg-[#0A2472]"
        style={{
          clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%)",
        }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/login-page.png"
            alt="Background"
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>

        {/* Company name */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-white text-4xl lg:text-6xl font-bold tracking-wider">
            <div>RCC COLAB</div>
            <div>SOLUTIONS INC.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
