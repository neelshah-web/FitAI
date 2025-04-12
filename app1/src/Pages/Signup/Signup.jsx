import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../firebase/auth"; // Assume the signup function is in firebase/auth.js
import "./Signup.css"; // Ensure the CSS is imported

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password);
            navigate("/dashboard"); // Navigate to dashboard after successful signup
        } catch (error) {
            console.error("Signup error:", error.message);
        }
    };

    return (
        <div className="signup-container"> {/* Apply signup-container class */}
            <div className="signup-form"> {/* Apply signup-form class */}
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Sign Up</button>
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
