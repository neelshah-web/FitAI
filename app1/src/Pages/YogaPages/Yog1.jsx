import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Yog1.css";

const Yog1 = () => {
  const navigate = useNavigate();
  const [isStartPose, setIsStartPose] = useState(false);
  const [isServerRestarting, setIsServerRestarting] = useState(false);
  const [error, setError] = useState(null);

  // Start Yoga Pose function
  const startYoga = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:8080/api/mediapipe/yog1", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to start yoga pose detection");
      }

      setIsStartPose(true);
      console.log("Yoga script started successfully");
    } catch (err) {
      setError(err.message);
      setIsStartPose(false);
    }
  };

  // Restart Server function
  const restartServer = async () => {
    try {
      setError(null);
      const response = await fetch("http://localhost:8080/restart", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to restart server");
      }

      console.log("Server restart triggered successfully");
      setIsStartPose(false);
    } catch (err) {
      setError(err.message);
    }
  };

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

      <h1 className="text-center my-3">Warrior Pose</h1>

      {error && (
        <div className="alert alert-danger text-center mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="yogContainerData d-flex gap-5">
        <div className="yogInfo gap-5">
          <ul className="">
            <li>Strengthens your shoulders, arms, legs, ankles and back</li>
            <li>Opens yours hips, chest and lungs</li>
            <li>Improves focus, balance and stability</li>
            <li>Strengthens and tones the entire standing leg, up to the buttocks</li>
            <li>Encourages good circulation and respiration</li>
            <li>Stretches your arms, legs, shoulders, neck, belly, groins and ankles</li>
            <li>Energizes the entire body</li>
          </ul>
        </div>
        <div className="yogImg m-auto d-flex justify-content-center align-items-center">
          <img
            className=""
            src="https://www.verywellfit.com/thmb/56AayW1tVPCe7jSaIq8GB5xvJg4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Verywell-03-3567198-Warrior2-aa285698e49a48e5b9e7cb890ae26bb3.jpg"
            alt="Warrior Pose"
          />
        </div>
      </div>

      <div className="yogStartPose my-5">
        {isStartPose ? (
          <button
            onClick={restartServer}
            className="btn btn-danger w-100"
          >
            Stop Pose
          </button>
        ) : (
          <button
            onClick={startYoga}
            className="btn btn-primary w-100"
          >
            Start Pose
          </button>
        )}
      </div>
    </div>
  );
};

export default Yog1;