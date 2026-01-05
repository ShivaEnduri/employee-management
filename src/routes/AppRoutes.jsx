import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
