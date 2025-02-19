import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='h-[100vh] w-1/5 bg-blue-300 text-white p-6 shadow-lg flex flex-col justify-between fixed'>
      <div>
        <h1 className='text-2xl font-bold mb-6 text-center'>Maniclang's Medical</h1>
        <ul className='flex flex-col gap-4'>
          <NavLink 
            to='/' 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink 
            to='/Patient' 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Patient
          </NavLink>
          <NavLink 
            to='/Reports' 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Reports
          </NavLink>
          <NavLink 
            to='/ClinicalData' 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-white text-blue-600 font-semibold' : 'hover:bg-blue-300'}`
            }
          >
            Clinical Data
          </NavLink>
        </ul>
      </div>
      <button className='flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors'>
     Logout
      </button>
    </nav>
  );
};

export default Navbar;
