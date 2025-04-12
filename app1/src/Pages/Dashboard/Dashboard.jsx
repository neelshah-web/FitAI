import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css"; // Include updated styles for futuristic design

import { AuthContext } from "../../Context/AuthContext";

const Dashboard = ({ setBmi }) => {
    // State for BMI form inputs and display logic
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [bmi, setBmiValue] = useState(null);
    const [bmiCategory, setBmiCategory] = useState("");
    const [detailsSubmitted, setDetailsSubmitted] = useState(false);

    const { currentUser } = useContext(AuthContext); // Get current user from AuthContext

    // Load stored BMI details from localStorage for the current user
    useEffect(() => {
        if (currentUser) {
            const storedBmiDetails = JSON.parse(localStorage.getItem(currentUser.uid)); // Use user UID as key
            if (storedBmiDetails) {
                setWeight(storedBmiDetails.weight);
                setHeight(storedBmiDetails.height);
                setAge(storedBmiDetails.age);
                setGender(storedBmiDetails.gender);
                setBmiValue(storedBmiDetails.bmi);
                setBmiCategory(storedBmiDetails.bmiCategory);
                setDetailsSubmitted(true);
            }
        }
    }, [currentUser]); // Re-run this effect if the user changes

    // Function to calculate BMI
    const calculateBmi = (event) => {
        event.preventDefault(); // Prevent page refresh

        if (weight && height && age && gender) {
            const heightInMeters = height / 100; // Convert height to meters
            const calculatedBmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
            setBmiValue(calculatedBmi);

            // Determine BMI category
            let category = "";
            if (calculatedBmi < 18.5) category = "Underweight";
            else if (calculatedBmi < 24.9) category = "Normal weight";
            else if (calculatedBmi < 29.9) category = "Overweight";
            else category = "Obesity";

            setBmiCategory(category);
            setDetailsSubmitted(true);

            // Save BMI details to localStorage for the current user
            localStorage.setItem(
                currentUser.uid, // Use user ID as the key
                JSON.stringify({
                    weight,
                    height,
                    age,
                    gender,
                    bmi: calculatedBmi,
                    bmiCategory: category,
                })
            );

            // Pass BMI details to App component via setBmi function
            setBmi({ bmi: calculatedBmi, category });
        } else {
            alert("Please fill in all the details!");
        }
    };

    // Function to reset form
    const resetForm = () => {
        setWeight("");
        setHeight("");
        setAge("");
        setGender("");
        setBmiValue(null);
        setBmiCategory("");
        setDetailsSubmitted(false);

        // Clear BMI details from localStorage for the current user
        localStorage.removeItem(currentUser.uid);
    };

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Track your health metrics and stay updated.</p>

            {currentUser ? ( // Only show the form if the user is logged in
                !detailsSubmitted ? (
                    <div className="bmi-card">
                        <h2>BMI Calculator</h2>
                        <form onSubmit={calculateBmi}> {/* Added form submission prevention */}
                            <div className="bmi-inputs">
                                <input
                                    type="number"
                                    placeholder="Weight (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Height (cm)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="gender-dropdown"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <button type="submit">Calculate BMI</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="bmi-results-container">
                        <button className="reset-button" onClick={resetForm}>
                            Enter Updated Details
                        </button>
                        <div className="bmi-result-card">
                            <h3>BMI</h3>
                            <p>{bmi}</p>
                        </div>
                        <div className="bmi-result-card">
                            <h3>Category</h3>
                            <p>{bmiCategory}</p>
                        </div>
                        <div className="bmi-result-card">
                            <h3>Age</h3>
                            <p>{age}</p>
                        </div>
                        <div className="bmi-result-card">
                            <h3>Gender</h3>
                            <p>{gender}</p>
                        </div>
                    </div>
                )
            ) : (
                <p>Please <a href="/login">login</a> to enter your BMI details.</p> // Message when user is not logged in
            )}
        </div>
    );
};

export default Dashboard;
