import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Yog1.css";
import yoga25 from "../../assets/yoga25.jpg";

const Yog2 = () => {
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);

  // Start Yoga Pose function
  function startYoga() {
    setIsStartPose(true);
    fetch("http://localhost:8080/api/mediapipe/yog2", {
      method: "POST",
    }).then((response) => {
      console.log("Yoga script started successfully");
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
        style={{
          width: '35px',
          height: '35px',
          padding: '0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        ←
      </button>

      <h1 className="text-center my-3">T Pose</h1>
      <div className="yogContainerData d-flex gap-5">
        <div className="yogInfo gap-5">
          <ul>
            <li>Improves your flexibility</li>
            <li>Strengthens your legs and abs</li>
            <li> Keeps your digestive tract on track</li>
            <li>Develops better balance</li>
          </ul>
        </div>
        <div className="yogImg m-auto d-flex justify-content-center align-items-center">
          <img src={yoga25} alt="T Pose" />
        </div>
      </div>
      <div className="yogStartPose my-5">
        {isStartPose ? (
          <>
            <button
              onClick={restartServer}
              className="btn btn-danger w-20 my-6"
            >
              Stop Pose
            </button>
          </>
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

export default Yog2;