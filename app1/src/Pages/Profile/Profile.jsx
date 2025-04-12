import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "./Profile.css";

// Eye icon for showing/hiding password
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Profile = () => {
    const { currentUser, updatePassword } = useContext(AuthContext);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = async (event) => {
        event.preventDefault();

        // Validate password match
        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        setPasswordError(""); // Reset error

        // Call updatePassword from context (firebase update password)
        try {
            await updatePassword(newPassword);
            setPasswordSuccess(true);
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            setPasswordError(error.message);
        }
    };

    return (
        <div className="profile-container dashboard">
            <h1>User Profile</h1>
            {currentUser ? (
                <div>
                    <p><strong>Email:</strong> {currentUser.email}</p>
                    {/* <p><strong>UID:</strong> {currentUser.uid}</p> */}

                    <div className="change-password-form">
                        <h3>Change Password</h3>
                        {passwordSuccess && <p className="success-message">Password updated successfully!</p>}
                        {passwordError && <p className="error">{passwordError}</p>}
                        <form onSubmit={handlePasswordChange} className="bmi-inputs">
                            <div className="password-input-container">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            <div className="password-input-container">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="eye-icon"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>

                            <button type="submit">Change Password</button>
                        </form>
                    </div>
                </div>
            ) : (
                <p>No user logged in.</p>
            )}
        </div>
    );
};

export default Profile;
