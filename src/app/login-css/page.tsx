"use client";
import React, { useState } from "react";
import "./LoginForm.css";

export default function LoginForm() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [submitErrors, setSubmitErrors] = useState({ email: "", password: "", general: "" });
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return "Email is required";
        if (!emailRegex.test(email)) return "Please enter a valid email address";
        return "";
    };

    const validatePassword = (password) => {
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        let error = "";
        if (name === "email") error = validateEmail(value);
        if (name === "password") error = validatePassword(value);
        setErrors((prev) => ({ ...prev, [name]: error }));
        if (hasSubmitted) {
            setSubmitErrors((prev) => ({
                ...prev,
                [name]: "",
                general: "",
            }));
        }
    };

    const handleSubmit = () => {
        setHasSubmitted(true);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);

        const simulateServerErrors = () => {
            if (formData.email === "taken@example.com") return { email: "This email is already registered" };
            if (formData.password === "wrongpass") return { password: "Invalid password" };
            if (formData.email === "admin@test.com" && formData.password === "admin123") return { general: "Account is temporarily locked" };
            return {};
        };

        const serverErrors = simulateServerErrors();

        setSubmitErrors({
            email: emailError || serverErrors.email || "",
            password: passwordError || serverErrors.password || "",
            general: serverErrors.general || "",
        });

        if (!emailError && !passwordError && !serverErrors.email && !serverErrors.password && !serverErrors.general) {
            alert("Login successful!");
            setFormData({ email: "", password: "" });
            setErrors({ email: "", password: "" });
            setSubmitErrors({ email: "", password: "", general: "" });
            setHasSubmitted(false);
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>

            <div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email || (hasSubmitted && submitErrors.email) ? "input-error" : ""}`}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                    {hasSubmitted && submitErrors.email && !errors.email && (
                        <p className="error-message">{submitErrors.email}</p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-input ${errors.password || (hasSubmitted && submitErrors.password) ? "input-error" : ""}`}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                    {hasSubmitted && submitErrors.password && !errors.password && (
                        <p className="error-message">{submitErrors.password}</p>
                    )}
                </div>

                {hasSubmitted && submitErrors.general && (
                    <div className="general-error">
                        <p>{submitErrors.general}</p>
                    </div>
                )}

                <button type="button" onClick={handleSubmit} className="login-button">
                    Login
                </button>
            </div>
        </div>
    );
}
