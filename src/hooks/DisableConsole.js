import React, { useEffect } from 'react';

const DisableConsole = () => {
  useEffect(() => {
    // Override console methods to disable them
    if (process.env.NODE_ENV === 'production') {
      console.log = console.info = console.warn = console.error = function() {};
    }
  }, []);

  return null;
};

export default DisableConsole;
