import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { assets } from "../assets/assets"; // ✅ Header ke assets import kiye
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
   

  const handleLogin = (e) => {
    e.preventDefault();

    const savedEmail = localStorage.getItem("signupEmail");
    const savedPassword = localStorage.getItem("signupPassword");

    if (email === savedEmail && password === savedPassword) {
      alert("Login Successful!");
      navigate("/", { state: { email: savedEmail } });
    } else {
     toast.error('Error,user not found')
      setTimeout(() => setError(""), 2500); // 2.5 sec baad auto hide
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">

      {/* ✅ Logo same as Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={assets.logo}
          className="mx-auto h-14 w-auto"
        />
        <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-700">
          Login to your account
        </h2>
      </div>

      {/* ✅ Form Section */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border border-gray-300 
                         px-3 py-2 text-gray-900 placeholder:text-gray-400 
                         focus:ring-2 focus:ring-purple-300 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 block w-full rounded-md border border-gray-300 
                         px-3 py-2 text-gray-900 placeholder:text-gray-400 
                         focus:ring-2 focus:ring-purple-300 sm:text-sm"
            />
          </div>
        

          {/* ✅ Button */}
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-fuchsia-500 
                       px-3 py-2 text-white font-semibold hover:bg-fuchsia-700 
                       focus:outline-none focus:ring-2 focus:ring-fuchsia-700"
          >
            Login
          </button>

          {/* ✅ Sign up link */}
          <p className="text-right text-sm text-gray-600">
            Not a Member?{" "}
            <Link
              to="/signup"
              className="font-semibold text-fuchsia-500 hover:text-purple-600"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
