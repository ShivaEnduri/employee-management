import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { RiUserLine, RiMailLine, RiLockLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      if (login(email, password)) {
        navigate("/dashboard");
      }
    } else {
      alert("Please enter a valid email and password (6+ characters)");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RiUserLine className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2">Sign in to access your dashboard</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiMailLine className="text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockLine className="text-gray-400 text-lg" />
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Demo: Use any valid email and password (6+ characters)
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
