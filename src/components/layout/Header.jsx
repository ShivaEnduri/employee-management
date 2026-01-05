import { FiLogOut, FiUser } from "react-icons/fi";
import { RiBuildingLine } from "react-icons/ri";

const Header = ({ userEmail }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <RiBuildingLine className="text-xl text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Employee Dashboard</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <FiUser />
              <span>{userEmail || "user@example.com"}</span>
            </div>

            <button
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => localStorage.clear() || window.location.reload()}
            >
              <FiLogOut />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
