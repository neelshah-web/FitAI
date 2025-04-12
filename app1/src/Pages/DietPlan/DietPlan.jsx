import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; // Assuming your AuthContext is in this location
import "./DietPlan.css";

const DietPlan = ({ bmiData }) => {
    const { currentUser } = useContext(AuthContext); // Accessing the currentUser from AuthContext
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [bmi, setBmi] = useState(() => {
        // Load BMI from localStorage
        return JSON.parse(localStorage.getItem("bmiData"))?.bmi || null;
    });
    const [bmiCategory, setBmiCategory] = useState(() => {
        // Load BMI category from localStorage
        return localStorage.getItem("bmiCategory") || "";
    });

    // Ensure BMI data is set when component mounts or when `bmiData` prop changes
    useEffect(() => {
        if (bmiData) {
            setBmi(bmiData.bmi);
            setBmiCategory(bmiData.category);
            // Persist BMI data in localStorage
            localStorage.setItem("bmiData", JSON.stringify(bmiData));
            localStorage.setItem("bmiCategory", bmiData.category);
        }
    }, [bmiData]);

    // Function to switch between Vegetarian and Non-Vegetarian diet plans
    const handleSwitchDiet = (event) => {
        event.preventDefault(); // Prevent page refresh
        setIsVegetarian((prev) => !prev);
    };

    // Function to get the diet plan based on BMI category and diet preference
    const getDietPlan = () => {
        let dietPlan = [];
        if (bmiCategory === "Underweight") {
            dietPlan = isVegetarian
                ? [
                    "Breakfast (8:00 AM): Oats with almond milk, chia seeds, and fruits.",
                    "Mid-Morning Snack (10:30 AM): A handful of nuts (almonds, walnuts).",
                    "Lunch (1:00 PM): Brown rice, lentils, roasted veggies, and avocado.",
                    "Evening Snack (4:00 PM): Banana smoothie with peanut butter.",
                    "Dinner (7:00 PM): Tofu stir-fry with quinoa and mixed veggies."
                ]
                : [
                    "Breakfast (8:00 AM): Scrambled eggs with spinach and whole wheat toast.",
                    "Mid-Morning Snack (10:30 AM): Boiled eggs with a handful of almonds.",
                    "Lunch (1:00 PM): Grilled chicken, quinoa, roasted vegetables.",
                    "Evening Snack (4:00 PM): Protein shake with banana and peanut butter.",
                    "Dinner (7:00 PM): Salmon with sweet potato and green beans."
                ];
        } else if (bmiCategory === "Normal weight") {
            dietPlan = isVegetarian
                ? [
                    "Breakfast (8:00 AM): Green smoothie with spinach, banana, almond milk, and flax seeds.",
                    "Mid-Morning Snack (10:30 AM): Apple slices with almond butter.",
                    "Lunch (1:00 PM): Chickpea salad with mixed greens, olive oil dressing, and avocado.",
                    "Evening Snack (4:00 PM): Carrot sticks with hummus.",
                    "Dinner (7:00 PM): Stir-fried tofu with vegetables and brown rice."
                ]
                : [
                    "Breakfast (8:00 AM): Scrambled eggs with avocado and toast.",
                    "Mid-Morning Snack (10:30 AM): Greek yogurt with a handful of berries.",
                    "Lunch (1:00 PM): Grilled chicken breast with quinoa and roasted vegetables.",
                    "Evening Snack (4:00 PM): Cottage cheese with cucumber.",
                    "Dinner (7:00 PM): Baked salmon with steamed broccoli and sweet potatoes."
                ];
        } else if (bmiCategory === "Overweight") {
            dietPlan = isVegetarian
                ? [
                    "Breakfast (8:00 AM): Smoothie with kale, berries, chia seeds, and almond milk.",
                    "Mid-Morning Snack (10:30 AM): Cucumber and carrot sticks with a low-fat dip.",
                    "Lunch (1:00 PM): Lentil soup with a side of mixed greens salad.",
                    "Evening Snack (4:00 PM): Almonds and a cup of green tea.",
                    "Dinner (7:00 PM): Grilled tofu with steamed vegetables."
                ]
                : [
                    "Breakfast (8:00 AM): Omelette with mushrooms, spinach, and low-fat cheese.",
                    "Mid-Morning Snack (10:30 AM): A boiled egg with a small portion of mixed nuts.",
                    "Lunch (1:00 PM): Grilled chicken breast with steamed veggies and brown rice.",
                    "Evening Snack (4:00 PM): Greek yogurt with a sprinkle of chia seeds.",
                    "Dinner (7:00 PM): Grilled fish with a side of quinoa and asparagus."
                ];
        } else if (bmiCategory === "Obesity") {
            dietPlan = isVegetarian
                ? [
                    "Breakfast (8:00 AM): Green smoothie with spinach, cucumber, and apple.",
                    "Mid-Morning Snack (10:30 AM): A handful of almonds and a cup of green tea.",
                    "Lunch (1:00 PM): Quinoa salad with mixed greens, tomatoes, cucumbers, and olive oil dressing.",
                    "Evening Snack (4:00 PM): Carrot and celery sticks with hummus.",
                    "Dinner (7:00 PM): Zucchini noodles with tomato basil sauce."
                ]
                : [
                    "Breakfast (8:00 AM): Scrambled eggs with spinach and avocado.",
                    "Mid-Morning Snack (10:30 AM): A boiled egg with cucumber slices.",
                    "Lunch (1:00 PM): Grilled chicken with cauliflower rice and a side of steamed broccoli.",
                    "Evening Snack (4:00 PM): A small portion of mixed nuts.",
                    "Dinner (7:00 PM): Baked cod with roasted vegetables."
                ];
        }
        return dietPlan;
    };

    return (
        <div className="diet-container">
            <h2 className="text-white">Your Diet Plan Based on BMI</h2>
            {currentUser ? (
                <div className="diet-plan-card">
                    <h3>Your BMI: {bmi}</h3>
                    <h4>{bmiCategory} Category</h4>
                    <ul>
                        {getDietPlan().map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    <button className="diet-btn" onClick={handleSwitchDiet}>
                        Switch to {isVegetarian ? "Non-Vegetarian" : "Vegetarian"} Plan
                    </button>
                </div>
            ) : (
                <p className="login-message">
                    Please <a href="/login">login</a> to get your personalized diet plan.
                </p>
            )}
        </div>
    );
};

export default DietPlan;
