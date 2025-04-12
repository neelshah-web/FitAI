import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import img6 from "../../assets/yoga232.png";
import "./Yog1.css";

const Yog5 = () => {
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);

  function startYoga() {
    setIsStartPose(true);
    fetch("http://localhost:8080/api/mediapipe/yog5", {
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

      <h1 className="text-center my-3">Dolphin Pose</h1>
      <div className="yogContainerData d-flex gap-5">
        <div className="yogInfo gap-5">
          <ul>
            <li>Great alternative to Downward Dog pose if you have sensitive wrists.</li>
            <li>Strengthens the shoulders, arms, upper body and legs.</li>
            <li>Activates the arches of your feet.</li>
            <li>Dolphin pose gives you the strength and actions needed for Headstand and Forearm balance.</li>
            <li>You should be able to hold the pose for 20 breaths before working on those poses.</li>
          </ul>
        </div>
        <div className="yogImg m-auto d-flex justify-content-center align-items-center">
          <img
            className=""
            src={img6}
            alt="Dolphin Pose"
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

export default Yog5;