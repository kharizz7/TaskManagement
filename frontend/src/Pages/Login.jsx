import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log(res.data);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert(res.data.message);

      navigate("/");

    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Login");
    // Firebase Google Login will go here later
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}

      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-800 text-white p-16 flex-col justify-center">

        <h1 className="text-5xl font-bold mb-6">
          TaskFlow AI
        </h1>

        <p className="text-lg text-blue-100 mb-10">
          Organize your work smarter with Artificial Intelligence.
        </p>

        <div className="space-y-6">

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>Generate tasks using AI</span>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle size={24} />
            <span>Priority & deadline suggestions</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✔</span>
            <span>Manage projects efficiently</span>
          </div>

          <div className="flex items-center gap-3">
            <span>✔</span>
            <span>Track productivity in one place</span>
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6">

        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold text-center">
            
          </h2>

          <p className="text-gray-500 text-center mt-2 mb-8">
            Login to continue
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

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
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
                placeholder="Enter your password"
                required
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
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
            onClick={handleGoogleLogin}
            className="w-full border rounded-lg py-3 flex justify-center items-center gap-3 hover:bg-gray-50"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <p className="text-center mt-8 text-gray-600">
            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;