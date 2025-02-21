import React from "react";
import { PlusCircle, Search, UserCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="ml-[20%] p-8 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📈 DASHBOARD</h1>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 pl-10 text-base border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
          {/* User Icon */}
          <UserCircle
            size={32}
            className="text-gray-600 cursor-pointer hover:text-gray-800 transition"
          />
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        {/* Patient Record */}
        <div className="bg-blue-100 shadow-md rounded-xl p-5 flex justify-between items-center border border-blue-500">
          <h2 className="text-xl font-medium text-gray-800">Patient Record</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Reports */}
        <div className="bg-blue-100 shadow-md rounded-xl p-5 flex justify-between items-center border border-blue-500">
          <h2 className="text-xl font-medium text-gray-800">Reports</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-blue-100 shadow-md rounded-xl p-5 flex justify-between items-center border border-blue-500">
          <h2 className="text-xl font-medium text-gray-800">Appointment</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Add New Appointment */}
        <div className="bg-blue-100 shadow-md rounded-xl p-5 flex justify-center items-center border border-blue-500">
          <button className="text-blue-600 hover:text-blue-800 transition duration-300">
            <PlusCircle size={55} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Footer with linear gradient */}
      <footer className="mt-8 pt-4 pb-4 border-t border-gray-200 text-center text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
