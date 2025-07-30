// "use client";

// import { FormEvent, useState, ChangeEvent } from "react";

// export default function LoginPage() {
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [error, setError] = useState<{ email: string[]; password: string[] }>({
//     email: [],
//     password: [],
//   });
//   const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
//     {
//       email: false,
//       password: false,
//     }
//   );

//   // Email validation function
//   const validateEmail = (email: string): string[] => {
//     const errors: string[] = [];
//     if (!email || email.trim() === "") {
//       errors.push("Email is required");
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       errors.push("Please enter a valid email address");
//     }

//     return errors;
//   };

//   // Password validation function
//   const validatePassword = (password: string): string[] => {
//     const errors: string[] = [];
//     if (!password || password.trim() === "") {
//       errors.push("Password is required");
//     } else if (password.length < 6) {
//       errors.push("Password must be at least 6 characters long");
//     }
//     return errors;
//   };

//   // Real-time validation on input change
//   const onChangeInputData = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "email") {
//       setEmail(value);
//       // Only show errors if field has been touched
//       if (touched.email) {
//         setError((prev) => ({
//           ...prev,
//           email: validateEmail(value),
//         }));
//       }
//     } else if (name === "password") {
//       setPassword(value);
//       // Only show errors if field has been touched
//       if (touched.password) {
//         setError((prev) => ({
//           ...prev,
//           password: validatePassword(value),
//         }));
//       }
//     }
//   };

//   // Handle field blur to mark as touched
//   const handleBlur = (fieldName: string) => {
//     setTouched((prev) => ({ ...prev, [fieldName]: true }));
//     // Validate the field when it loses focus
//     if (fieldName === "email") {
//       setError((prev) => ({
//         ...prev,
//         email: validateEmail(email),
//       }));
//     } else if (fieldName === "password") {
//       setError((prev) => ({
//         ...prev,
//         password: validatePassword(password),
//       }));
//     }
//   };

//   const OnFormSubmitData = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     // Mark all fields as touched on submit
//     setTouched({ email: true, password: true });

//     // Validate all fields
//     const emailErrors = validateEmail(email);
//     const passwordErrors = validatePassword(password);

//     const newErrors = {
//       email: emailErrors,
//       password: passwordErrors,
//     };

//     setError(newErrors);

//     // If there are any errors, don't submit
//     if (emailErrors.length > 0 || passwordErrors.length > 0) {
//       return;
//     }

//     console.log("Submitted", { email, password });
//     // Here you would typically make an API call
//   };

//   return (
//     <div className="m-5">
//       <div className="flex flex-col justify-between max-w-md">
//         <div className="text-xl mb-4">Login Page</div>

//         <div className="p-5">
//           <label className="text-lg block mb-2">Email:</label>
//           <input
//             name="email"
//             type="email"
//             value={email}
//             onChange={onChangeInputData}
//             onBlur={() => handleBlur("email")}
//             className={`ring-1 rounded-md p-2 w-full ${
//               error.email.length > 0 && touched.email
//                 ? "ring-red-500"
//                 : "ring-gray-300"
//             }`}
//             placeholder="Enter Email"
//           />
//           {touched.email && error.email.length > 0 && (
//             <div className="text-red-500 text-sm mt-1">
//               {error.email.map((err, index) => (
//                 <div key={index}>{err}</div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="p-5">
//           <label className="text-lg block mb-2">Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={password}
//             onChange={onChangeInputData}
//             onBlur={() => handleBlur("password")}
//             className={`ring-1 rounded-md p-2 w-full ${
//               error.password.length > 0 && touched.password
//                 ? "ring-red-500"
//                 : "ring-gray-300"
//             }`}
//             placeholder="Enter Password"
//           />
//           {touched.password && error.password.length > 0 && (
//             <div className="text-red-500 text-sm mt-1">
//               {error.password.map((err, index) => (
//                 <div key={index}>{err}</div>
//               ))}
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           onClick={OnFormSubmitData}
//           className="bg-indigo-300 hover:bg-indigo-400 ring-2 rounded-md text-black text-md p-2 mx-5 transition-colors"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [submitErrors, setSubmitErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Handle input changes with live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Live validation as user types
    let error = "";
    if (name === "email") {
      error = validateEmail(value);
    } else if (name === "password") {
      error = validatePassword(value);
    }

    // Update live errors
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    // Clear submit errors when user starts typing again
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
    // Simulate server-side validation errors
    const simulateServerErrors = () => {
      if (formData.email === "taken@example.com") {
        return { email: "This email is already registered" };
      }
      if (formData.password === "wrongpass") {
        return { password: "Invalid password" };
      }
      if (
        formData.email === "admin@test.com" &&
        formData.password === "admin123"
      ) {
        return { general: "Account is temporarily locked" };
      }
      return {};
    };

    const serverErrors = simulateServerErrors();
    // Set submit errors
    setSubmitErrors({
      email: emailError || serverErrors.email || "",
      password: passwordError || serverErrors.password || "",
      general: serverErrors.general || "",
    });

    // If no errors, simulate successful submission
    if (
      !emailError &&
      !passwordError &&
      !serverErrors.email &&
      !serverErrors.password &&
      !serverErrors.general
    ) {
      alert("Login successful!");
      // Reset form
      setFormData({ email: "", password: "" });
      setErrors({ email: "", password: "" });
      setSubmitErrors({ email: "", password: "", general: "" });
      setHasSubmitted(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login
      </h2>

      <div className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email || (hasSubmitted && submitErrors.email)
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
              }`}
            placeholder="Enter your email"
          />

          {/* Live validation error */}
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}

          {/* Submit validation error */}
          {hasSubmitted && submitErrors.email && !errors.email && (
            <p className="mt-1 text-sm text-red-600">{submitErrors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password || (hasSubmitted && submitErrors.password)
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300"
              }`}
            placeholder="Enter your password"
          />

          {/* Live validation error */}
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}

          {/* Submit validation error */}
          {hasSubmitted && submitErrors.password && !errors.password && (
            <p className="mt-1 text-sm text-red-600">{submitErrors.password}</p>
          )}
        </div>

        {/* General submit error */}
        {hasSubmitted && submitErrors.general && (
          <div className="p-3 bg-red-100 border border-red-400 rounded-md">
            <p className="text-sm text-red-700">{submitErrors.general}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}
