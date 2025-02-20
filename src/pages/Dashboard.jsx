import React from "react";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="ml-[20%] p-8 bg-white min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">📈 DASHBOARD</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Patient Record */}
        <div className="bg-blue-100 shadow-md rounded-xl p-6 flex justify-between items-center border border-blue-300">
          <h2 className="text-2xl font-semibold text-gray-800">Patient Record</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Reports */}
        <div className="bg-blue-100 shadow-md rounded-xl p-6 flex justify-between items-center border border-blue-300">
          <h2 className="text-2xl font-semibold text-gray-800">Reports</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-blue-100 shadow-md rounded-xl p-6 flex justify-between items-center border border-blue-300">
          <h2 className="text-2xl font-semibold text-gray-800">Appointment</h2>
          <button className="bg-blue-400 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-500">
            Browse All
          </button>
        </div>

        {/* Add New Appointment */}
        <div className="bg-blue-100 shadow-md rounded-xl p-6 flex justify-center items-center border border-blue-300">
          <button className="text-blue-600 hover:text-blue-800 transition duration-300">
            <PlusCircle size={60} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
