import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img7 from "../../assets/yoga9.jpg";
import "./Yog1.css";

const Yog6 = () => {
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);

  function startYoga() {
    setIsStartPose(true);
    fetch("http://localhost:8080/api/mediapipe/yog6", {
      method: "POST",
    }).then((response) => {
      console.log("Script called successfully in the frontend");
    });
  }

  // Restart Server function
  function restartServer() {
    setIsServerRestarting(true);
    fetch("http://localhost:8080/restart", {
      method: "POST",
    }).then((response) => {
      console.log("Server restart triggered successfully");
      setIsStartPose(false); // Stop the pose and remove the button
    });
  }

  // Back to Learn page function
  const handleBackToLearn = () => {
    navigate("/learn");
  };

  return (
    <div className="yogContainer p-3 position-relative">
      {/* Back Button */}
      <button
        onClick={handleBackToLearn}
        className="btn btn-sm btn-outline-secondary position-absolute top-0 start-0 m-2"
        style={{ width: '35px', height: '35px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        ←
      </button>

      <h1 className="text-center my-3">Downward Dog Pose</h1>
      <div className="yogContainerData d-flex gap-5">
        <div className="yogInfo gap-5">
          <ul>
            <li>Great for stretching and strengthening the entire body</li>
            <li>Helps in decompressing the spine</li>
            <li>Strengthens shoulders, arms, and legs</li>
            <li>Improves circulation and energy flow</li>
            <li>Can help relieve back pain and tension</li>
          </ul>
        </div>
        <div className="yogImg m-auto d-flex justify-content-center align-items-center">
          <img
            className=""
            src={img7}
            alt="Downward Dog Pose"
          />
        </div>
      </div>
      <div className="mt-5 yogStartPose my-2">
        {isStartPose ? (
          <button
            onClick={restartServer}
            className="btn btn-danger w-20 my-6"
          >
            Stop Pose
          </button>
        ) : (
          <button
            onClick={startYoga}
            className="btn btn-primary w-20 my-6"
          >
            Start Pose
          </button>
        )}
        {isServerRestarting && <p></p>}
      </div>
    </div>
  );
};

export default Yog6;