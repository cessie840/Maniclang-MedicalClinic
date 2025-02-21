import React, { useState } from 'react';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';

const ClinicalData = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const patients = [
    { name: 'John Doe', age: 30, gender: 'Male', mainComplaint: 'Masakit ang ulo' },
    { name: 'Jane Smith', age: 25, gender: 'Female', mainComplaint: 'Masakit ang ulo' },
    { name: 'Alex Johnson', age: 40, gender: 'Other', mainComplaint: 'Masakit ang ulo' },
  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="ml-[20%] grid grid-cols-1 md:grid-cols-2 gap-8 h-screen p-6 bg-gray-100">
      
      {/* Left Section: Clinical Data Form */}
      <div className="shadow-lg rounded-lg p-8 bg-gradient-to-b from-blue-200 to-blue-100">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 flex items-center gap-3">
          <FaUserPlus className="text-blue-700" /> CLINICAL DATA
        </h1>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Name</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Age</label>
            <input 
              type="number" 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Heart Rate</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Blood Pressure</label>
            <input 
              type="text" 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Diagnosis</label>
            <textarea 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Prescription</label>
            <textarea 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Medical History</label>
            <select 
              className="mt-1 block w-full p-2 border border-blue-200 rounded-md shadow"
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Save Report
          </button>
        </form>
      </div>

      {/* Right Section: Patient Report */}
      <div className="shadow-lg rounded-lg p-8 bg-gradient-to-b from-blue-200 to-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📝 PATIENT REPORT</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Search patients..."
          />
        </div>

        <ul className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <li key={index} className="p-4 border rounded-md bg-white shadow flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-900">{patient.name}</p>
                <p className="text-sm text-gray-700"><strong>Age:</strong> {patient.age}</p>
                <p className="text-sm text-gray-700"><strong>Gender:</strong> {patient.gender}</p>
                <p className="text-sm text-gray-700"><strong>Main Complaint:</strong> {patient.mainComplaint}</p>
              </div>

              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 flex items-center gap-1">
                  <FaEdit /> Edit/View
                </button>

                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicalData;
