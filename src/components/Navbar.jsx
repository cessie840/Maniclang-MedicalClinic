import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

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
    <nav className='h-[100vh] w-1/5 bg-bluee text-black p-6 shadow-lg flex flex-col justify-between fixed font-sans'>
      <div className='flex flex-col justify-between h-[50vh]' >
        <h1 className='text-2xl font-bold mb-6 text-center'>Maniclang's Medical</h1>
        <ul className='flex flex-col gap-4'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `px-4 py-2 text-xl rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to='/Patient' 
            className={({ isActive }) => 
              `px-4 py-2 text-xl rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Patient
          </NavLink>
          <NavLink 
            to='/Reports' 
            className={({ isActive }) => 
              `px-4 py-2 text-xl rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Reports
          </NavLink>
          <NavLink 
            to='/ClinicalData' 
            className={({ isActive }) => 
              `px-4 py-2 text-xl rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Clinical Data
          </NavLink>
        </ul>
      </div>
      <button onClick={handleLogout} className='gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'>
        <h1 className="text-center text-xl">
        Logout
        </h1>
          
      </button>
    </nav>
  );
};

export default Navbar;
