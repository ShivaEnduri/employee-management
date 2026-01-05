import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Employee Management Dashboard</h1>
        <p className="text-gray-500">Streamline your employee operations with our modern dashboard</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-teal-600 text-white rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Landing;
