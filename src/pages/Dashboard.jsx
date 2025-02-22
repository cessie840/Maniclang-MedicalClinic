import React from "react";
import { PlusCircle, Search, UserCircle, Calendar, FileText, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="ml-[20%] p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-white shadow-lg p-6 rounded-xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="bg-blue-500 text-white p-2 rounded-lg">📈</span>
          DASHBOARD
        </h1>
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 pl-10 text-base border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 transition-all duration-300 hover:shadow-md"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
          </div>
          {/* User Icon */}
          <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
            <UserCircle size={32} className="text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 flex-grow">
        {/* Patient Record */}
        <div className="bg-white shadow-xl rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-l-4 border-blue-500">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <Users className="text-blue-600 w-8 h-8" />
            </div>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
              24 Active
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Patient Record</h2>
          <p className="text-gray-600 mb-4">Manage and view patient information</p>
          <button className="w-full bg-blue-500 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-sm transition duration-300 hover:bg-blue-600 flex items-center justify-center gap-2">
            <span>Browse All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Reports */}
        <div className="bg-white shadow-xl rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-l-4 border-green-500">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <FileText className="text-green-600 w-8 h-8" />
            </div>
            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
              12 New
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Reports</h2>
          <p className="text-gray-600 mb-4">View and generate medical reports</p>
          <button className="w-full bg-green-500 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-sm transition duration-300 hover:bg-green-600 flex items-center justify-center gap-2">
            <span>Browse All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Appointments */}
        <div className="bg-white shadow-xl rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-l-4 border-yellow-500">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Calendar className="text-yellow-600 w-8 h-8" />
            </div>
            <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              8 Today
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Appointments</h2>
          <p className="text-gray-600 mb-4">Schedule and manage appointments</p>
          <button className="w-full bg-yellow-500 text-white px-5 py-3 rounded-xl text-sm font-medium shadow-sm transition duration-300 hover:bg-yellow-600 flex items-center justify-center gap-2">
            <span>Browse All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Add New Appointment */}
        <div className="bg-white shadow-xl rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-l-4 border-gray-500">
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="bg-gray-100 p-6 rounded-full">
              <PlusCircle className="w-12 h-12 text-gray-600" />
            </div>
            <p className="text-gray-600 font-medium">Add New Appointment</p>
          </div>
        </div>
      </div>

      {/* Footer with enhanced gradient */}
      <footer className="mt-8 pt-6 pb-6 border-t border-gray-200 text-center text-sm text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-xl shadow-lg">
        <div className="max-w-2xl mx-auto">
          <p className="font-medium">© {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;