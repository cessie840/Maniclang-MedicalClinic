import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, FileText, Clipboard, LogOut } from "lucide-react";

const Navbar = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="h-screen w-64 bg-gradient-to-b from-[#363738] to-[#90c2f1] text-gray-100 p-6 shadow-lg flex flex-col justify-between fixed font-sans">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center gap-3 mb-12 mt-4">
          <span className=" text-white p-2"></span>
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Maniclang's Medical
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-cyan-500 text-white font-semibold shadow-md" 
                  : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <LayoutDashboard className="text-blue-300" size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink
            to="/Patient"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-red-500 text-white font-semibold shadow-md" 
                  : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Users className="text-green-300" size={20} />
            <span>Patient Record</span>
          </NavLink>
          <NavLink
            to="/Reports"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-green-500 text-white font-semibold shadow-md" 
                  : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <FileText className="text-violet-300" size={20} />
            <span>Reports</span>
          </NavLink>
          <NavLink
            to="/ClinicalData"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? "bg-yellow-500 text-white font-semibold shadow-md" 
                  : "hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <Clipboard className="text-yellow-300" size={20} />
            <span>Clinical Data</span>
          </NavLink>
        </ul>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl transition-all shadow-md hover:from-red-600 hover:to-red-700"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;