import React, { useState } from 'react';
import { Search } from 'lucide-react';

const Reports = () => {
  const [search, setSearch] = useState("");
  const patients = [
    { name: 'John Doe', age: 30, gender: 'Male', contact: '123-456-7890' },
    { name: 'Jane Smith', age: 25, gender: 'Female', contact: '987-654-3210' },
    { name: 'Alex Johnson', age: 40, gender: 'Other', contact: '555-666-7777' },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-[20%] grid grid-cols-2 gap-x-10 h-screen bg-gray-100 p-8">
      {/* Form Section */}
      <div className="px-10 py-12 bg-gradient-to-br from-blue-100 to-blue-300 shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">📝 REPORT</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Age</label>
            <input
              type="number"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Gender</label>
            <select
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Main Complaint</label>
            <input
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Symptoms</label>
            <input
              type="text"
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Medical History</label>
            <select
              className="mt-2 block w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-semibold"
          >
            ✅ Save Report
          </button>
        </form>
      </div>

      {/* Patient List Section with Border and Gap */}
      <div className="border border-gray-300 rounded-3xl shadow-2xl bg-gradient-to-br from-blue-100 to-blue-300 p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">👥 PATIENT LIST</h2>
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search patients..."
            className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-500" size={20} />
        </div>
        <ul className="space-y-6">
          {filteredPatients.map((patient, index) => (
            <li
              key={index}
              className="p-6 border border-gray-300 rounded-2xl bg-white shadow-lg flex justify-between items-center hover:shadow-xl transition-transform hover:scale-105"
            >
              <div>
                <p className="text-lg font-semibold text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-600"><strong>Age:</strong> {patient.age}</p>
                <p className="text-sm text-gray-600"><strong>Gender:</strong> {patient.gender}</p>
                <p className="text-sm text-gray-600"><strong>Contact:</strong> {patient.contact}</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all shadow-md">
                  ✏️ Edit/View
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md">
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;
