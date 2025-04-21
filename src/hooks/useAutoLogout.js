import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAutoLogout = (redirectPath = "/client/login") => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    const inactivityLimit = 5 * 60 * 1000; // 5 minutes

    // Function to reset inactivity timer
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Check if user is actually logged in before logging out
        if (localStorage.getItem("token") || localStorage.getItem("user")) {
          // Clear localStorage and redirect to login page
          localStorage.clear();
          // Optional: Inform user about session expiration
          alert("Your session has expired due to inactivity.");
          navigate(redirectPath);
        }
      }, inactivityLimit);
    };

    // Detect user activities
    const activities = [
      "mousemove",
      "mousedown",
      "keypress",
      "scroll",
      "touchstart",
    ];

    // Add event listeners for all activities
    activities.forEach((activity) => {
      window.addEventListener(activity, resetTimer);
    });

    // Initialize the timer when the component mounts
    resetTimer();

    return () => {
      // Clean up all event listeners when the component unmounts
      activities.forEach((activity) => {
        window.removeEventListener(activity, resetTimer);
      });
      clearTimeout(timeout);
    };
  }, [navigate, redirectPath]);
};

export default useAutoLogout;
