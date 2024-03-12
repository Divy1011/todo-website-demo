import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function Progressbars() {
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5; // Increment progress by 5%
        if (newProgress >= 100) {
          clearInterval(interval);
          setShowProgressBar(false); // Hide progress bar after reaching 100%
          return 100;
        }
        return newProgress;
      });
    }, 20); // Update progress every 100 milliseconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      {showProgressBar && (
        <ProgressBar
          striped
          variant="success"
          style={{ width: `${progress}%`, backgroundColor: "red", height: "5px" }}
        />
      )}
    </div>
  );
}

export default Progressbars;

