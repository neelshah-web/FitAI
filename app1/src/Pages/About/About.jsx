import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="aboutData">
        <h2>Yoga Posture Detection and Correction</h2>
        <p>
          The Yoga Posture Detection and Correction App leverages advanced
          computer vision and machine learning techniques to assess and correct
          yoga poses in real-time. Using a webcam or mobile device camera, the
          app analyzes the user's body movements and compares them to ideal yoga
          poses. It provides real-time feedback on alignment, posture, and
          breathing to ensure that users practice yoga safely and effectively.
        </p>
        <h2>AI-Driven Correction</h2>
        <p>
          The app incorporates artificial intelligence (AI) and machine learning
          algorithms to detect subtle discrepancies in the user's posture. Based
          on these observations, it offers personalized suggestions to help users
          correct their poses. The goal is to minimize the risk of injury and
          optimize the benefits of each yoga practice session.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>Real-time posture analysis with feedback</li>
          <li>Personalized yoga session recommendations</li>
          <li>Progress tracking and performance metrics</li>
          <li>Corrective suggestions for posture alignment</li>
          <li>Customizable difficulty levels for different users</li>
          <li>Integration with wearable devices for advanced tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default About;