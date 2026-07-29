import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.password.trim() ||
      !form.confirmPassword.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      alert(res.data.message);

      // Clear form
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to Login page
      navigate("/login");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google Register");
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 to-blue-800 text-white p-16 flex-col justify-center">

        <h1 className="text-5xl font-bold mb-6">
          TaskFlow AI
        </h1>

        <p className="text-lg text-indigo-100 mb-10">
          Create your account and start managing your tasks with AI.
        </p>

        <div className="space-y-6">

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>AI-powered task creation</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>Priority & deadline suggestions</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>Smart project management</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>Secure cloud storage</span>
          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mt-2 mb-8">
            Join TaskFlow AI today
          </p>

          <form onSubmit={handleRegister} className="space-y-5">

            <div>
              <label className="block mb-2 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Create Account
            </button>

          </form>

          <div className="flex items-center my-6">

            <hr className="flex-1" />

            <span className="mx-4 text-gray-500">
              OR
            </span>

            <hr className="flex-1" />

          </div>

          <button
            onClick={handleGoogleRegister}
            className="w-full border rounded-lg py-3 flex items-center justify-center gap-3 hover:bg-gray-50 transition"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;