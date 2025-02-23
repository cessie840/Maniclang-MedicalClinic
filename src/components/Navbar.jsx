import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import {CiMedicalCross} from 'react-icons/ci';
import { LayoutDashboard, User, FileText, Clipboard, LogOut } from "lucide-react";


const Navbar = ({ setIsAuthenticated, isAuthenticated }) => {
  console.log(isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false); // Update auth state
    navigate('/login'); // Redirect to login
  };
  return (
    <nav className="h-screen w-64 bg-gradient-to-b from-[#5D81A5] to-[#7D9DBB] text-gray-100 p-6 shadow-lg flex flex-col justify-between fixed font-sans">
      <div className="flex flex-col h-full items-center">
        <CiMedicalCross size={100} className='white text-center'/>
        <h1 className="text-2xl font-bold text-center mb-6 tracking-wide text-white">
          Maniclang's Medical
        </h1>
        <ul className='flex flex-col gap-3'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-[#4A6C8C] text-white font-semibold shadow-md" : "hover:bg-[#6789A8] hover:text-white"}`
            }
          >
            <LayoutDashboard size={20} />Dashboard
          </NavLink>
          <NavLink 
            to='/Patient' 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-[#4A6C8C] text-white font-semibold shadow-md" : "hover:bg-[#6789A8] hover:text-white"}`
            }
          >
            <User size={20} />Patient
          </NavLink>
          <NavLink 
            to='/Reports' 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-[#4A6C8C] text-white font-semibold shadow-md" : "hover:bg-[#6789A8] hover:text-white"}`
            }
          >
            <FileText size={20} />Reports
          </NavLink>
          <NavLink 
            to='/ClinicalData' 
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive ? "bg-[#4A6C8C] text-white font-semibold shadow-md" : "hover:bg-[#6789A8] hover:text-white"}`
            }
          >
            <Clipboard size={20} />Clinical Data
          </NavLink>
        </ul>
      </div>
       {/* Logout Button */}
       <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all shadow-md cursor-pointer ">
          <LogOut size={20} />
          Logout
        </button>
    </nav>
  );
};

export default Navbar;
