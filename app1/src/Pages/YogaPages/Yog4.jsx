import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Yog1.css";
import img2 from "../../assets/yoga15.jpg";

const Yog4 = () => {
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);

  function startYoga() {
    setIsStartPose(true);
    fetch("http://localhost:8080/api/mediapipe/yog4", {
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

      <h1 className="text-center my-3">Side Plank Pose</h1>
      <div className="yogContainerData d-flex gap-5">
        <div className="yogInfo gap-5">
          <ul>
            <li>Strengthens three muscle groups at once</li>
            <li>Protects your spine</li>
            <li>Strengthens your core without stressing your back</li>
            <li>Improves your balance</li>
            <li>Reduces your risk of a back injury</li>
          </ul>
        </div>
        <div className="yogImg m-auto d-flex justify-content-center align-items-center">
          <img src={img2} alt="Side Plank Pose" />
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

export default Yog4;