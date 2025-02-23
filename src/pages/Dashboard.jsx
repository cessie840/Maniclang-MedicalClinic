import React from "react";
import { PlusCircle, Search, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="ml-[20%] p-8 bg-white min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">📈 DASHBOARD</h1>
        <div className="flex items-center gap-4">
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
        <Link to='/Patient' className="bg-blue-100 shadow-md rounded-xl p-5 flex flex-col items-center border border-blue-500 cursor-pointer hover:shadow-lg transition">
        <img src="RECORD.png" alt="Patient Record" className="w-50 h-50 mb-4" />
        <h2 className="text-xl font-medium text-gray-800">Patient Record</h2>
        </Link>

        {/* Reports */}
        <Link to='/Reports' className="bg-blue-100 shadow-md rounded-xl p-5 flex flex-col items-center border border-blue-500 cursor-pointer hover:shadow-lg transition">
        <img src="REPORT.png" alt="Reports" className="w-50 h-50 mb-4" />
          <h2 className="text-xl font-medium text-gray-800">Reports</h2>
        </Link>

        {/* Appointments */}
        <Link to='/ClinicalData' className="bg-blue-100 shadow-md rounded-xl p-5 flex flex-col items-center border border-blue-500 cursor-pointer hover:shadow-lg transition">
        <img src="CLINICALDATA.png" alt="ClinicalData" className="w-50 h-50 mb-4" />
        <h2 className="text-xl font-medium text-gray-800">Clinical Data</h2>
        </Link>

        {/* Add New Appointment */}
        <Link to='/ClinicalData' className="bg-blue-100 shadow-md rounded-xl p-5 flex flex-col items-center border border-blue-500 cursor-pointer hover:shadow-lg transition">
        <br />
        <br />
        <br />
        <PlusCircle size={55} strokeWidth={1.5} className="text-blue-600" />
          <h2 className="text-xl font-medium text-blue-600 mt-2">Add New</h2>
        </Link>


      </div>

      {/* Footer with linear gradient */}
      <footer className="mt-8 pt-4 pb-4 border-t border-gray-200 text-center text-sm text-white bg-gradient-to-r from-blue-500 to-blue-700">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;