import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; 
import { assets } from "../assets/assets"; // ✅ Header ke assets import kiye

import React, { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "At least one uppercase letter required")
        .matches(/[a-z]/, "At least one lowercase letter required")
        .matches(/[0-9]/, "At least one number required")
        .matches(/[^a-zA-Z0-9]/, "At least one special character required")
        .required("Password is required"),
      name: Yup.string().required("Name is required")
    }),
    onSubmit: async (values) => {
      console.log("Form data", values);

      const nameParts = values.name.trim().split(" ");
      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(" ") || "";

      try {
        const response = await fetch(
          "http://sata-be.eu-north-1.elasticbeanstalk.com/api/user/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstname,
              lastname,
              email: values.email,
              password: values.password,
              role: "user",
            }),
          }
        );

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          localStorage.setItem("signupEmail", values.email);
  localStorage.setItem("signupPassword", values.password);

          alert("Signup Successful!");
          navigate("/login"); 
        } else {
          alert(data.message || "Signup failed!");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
      }
    },
  });

  const password = formik.values.password;
  const conditions = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    numberSymbol: /[0-9!@#$%^&*]/.test(password),
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <main className="flex flex-1 items-center justify-center px-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
 <img
          alt="Your Company"
          src={assets.logo}
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-700 ">
         Create your account
        </h2>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            
            {/* Name */}
            <div>
             <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                value={formik.values.password}
                onChange={formik.handleChange}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  setIsPasswordFocused(false);
                }}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}

              {isPasswordFocused && (
                <ul className="text-sm mt-2 space-y-1">
                  <li className={conditions.length ? "text-green-600" : "text-red-500"}>
                    • Minimum 6 characters
                  </li>
                  <li className={conditions.upper ? "text-green-600" : "text-red-500"}>
                    • At least one uppercase letter
                  </li>
                  <li className={conditions.lower ? "text-green-600" : "text-red-500"}>
                    • At least one lowercase letter
                  </li>
                  <li className={conditions.numberSymbol ? "text-green-600" : "text-red-500"}>
                    • At least one number or symbol
                  </li>
                </ul>
              )}
            </div>

            {/* Submit */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-fuchsia-500 
                       px-3 py-2 text-white font-semibold hover:bg-fuchsia-700 
                       focus:outline-none focus:ring-2 focus:ring-fuchsia-700"
          >
           Sign Up
          </button>
          </form>

          {/* Already have account */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login"  className="font-semibold text-fuchsia-500 hover:text-purple-600">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
