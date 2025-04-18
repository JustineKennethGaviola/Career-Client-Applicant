import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let timeout;
    const inactivityLimit = 5 * 60 * 1000; // 5 minutes

    // Function to reset inactivity timer
    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Clear localStorage and redirect to login page
        localStorage.clear();
        navigate('/login'); // Redirect to login
      }, inactivityLimit);
    };

    // Detect user activities (mousemove, keyboard, etc.)
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // Initialize the timer when the component mounts
    resetTimer();

    return () => {
      // Clean up the event listeners when the component unmounts
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(timeout);
    };
  }, [navigate]);
};

export default useAutoLogout;
