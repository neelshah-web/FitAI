import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { AuthContext } from "./Context/AuthContext";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Learn from "./Pages/Learn/Learn";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DietPlan from "./Pages/DietPlan/DietPlan";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Profile from "./Pages/Profile/Profile";

// Importing yoga pose pages
import Yog1 from "./Pages/YogaPages/Yog1";
import Yog2 from "./Pages/YogaPages/Yog2";
import Yog3 from "./Pages/YogaPages/Yog3";
import Yog4 from "./Pages/YogaPages/Yog4";
import Yog5 from "./Pages/YogaPages/Yog5";
import Yog6 from "./Pages/YogaPages/Yog6";

// ProtectedRoute Component to restrict access to routes that require login
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);

  return currentUser ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

const App = () => {
  const [bmiData, setBmiData] = useState({ bmi: null, category: "" });

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          {/* Learn Route with sub-routes for yoga poses */}
          <Route path="learn/*" element={<Learn />} />
          <Route path="learn/yog1" element={<Yog1 />} />
          <Route path="learn/yog2" element={<Yog2 />} />
          <Route path="learn/yog3" element={<Yog3 />} />
          <Route path="learn/yog4" element={<Yog4 />} />
          <Route path="learn/yog5" element={<Yog5 />} />
          <Route path="learn/yog6" element={<Yog6 />} />

          {/* No Protection for Dashboard Route */}
          <Route path="dashboard" element={<Dashboard setBmi={setBmiData} />} />
          <Route path="dietplan" element={<DietPlan bmiData={bmiData} />} />

          {/* Protected Routes */}

          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
