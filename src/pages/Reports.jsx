import React, { useState } from "react";
import { 
  Search, 
  Edit2,
  Trash2
} from "lucide-react";

const Reports = () => {
  const [search, setSearch] = useState("");
  const [mainComplaint, setMainComplaint] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const patients = [
    { name: 'John Doe', age: 30, gender: 'Male', contact: '123-456-7890' },
    { name: 'Jane Smith', age: 25, gender: 'Female', contact: '987-654-3210' },
    { name: 'Alex Johnson', age: 40, gender: 'Other', contact: '555-666-7777' },
  ];

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ml-[20%] p-8 min-h-screen">
      <div className="grid grid-cols-2 gap-8">
        {/* Add Report Form */}
        <div className="bg-blue-100 shadow-lg shadow-white rounded-xl overflow-hidden">
          <div className="bg-blue-500 p-6">
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              <span className="text-2xl">📝</span>
              New Medical Report
            </h1>
          </div>
          
          <form className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter patient's name"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Age"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Complaint</label>
              <input
                type="text"
                value={mainComplaint}
                onChange={(e) => setMainComplaint(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter main complaint"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
              <input
                type="text"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter symptoms"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <select
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                required
              >
                <option value="">Select Option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <span className="text-xl">✅</span>
              Save Report
            </button>
          </form>
        </div>

        {/* Reports List */}
        <div className="bg-blue-100 shadow-lg shadow-white rounded-xl overflow-hidden">
          <div className="bg-blue-500 p-6">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
              <span className="text-2xl">👥</span>
              Patient Reports
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredPatients.map((patient, index) => (
                <div
                  key={index}
                  className="bg-gray-100 rounded-xl p-4 border border-blue-300 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <p>Age: {patient.age}</p>
                        <p>Gender: {patient.gender}</p>
                        <p>Contact: {patient.contact}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;