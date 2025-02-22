import React, { useState, useEffect } from "react";
import { 
  Trash2, 
  Edit2, 
  CheckCircle, 
  Search, 
  UserPlus,
  Users,
  Phone,
  Calendar
} from "lucide-react";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    setFilteredPatients(
      patients.filter((patient) =>
        patient.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, patients]);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost/PHP/view_patients.php");
      const data = await response.json();
      if (data.status === "success") {
        setPatients(data.patients);
        setFilteredPatients(data.patients);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost/PHP/delete_patient.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (data.status === "success") {
        fetchPatients();
        setSuccess("Patient deleted successfully! ✅");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while deleting the patient.");
    }
  };

  return (
    <div className="ml-[20%] p-8 min-h-screen">
      <div className="grid grid-cols-2 gap-8">
        {/* Add Patient Form */}
        <div className="bg-blue-100 shadow-lg shadow-white rounded-xl overflow-hidden">
          <div className="bg-blue-500 p-6">
            <h1 className="text-2xl font-bold text-black flex items-center gap-2">
              <UserPlus size={24} />
              Add New Patient
            </h1>
          </div>
          
          <form className="p-6 space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                placeholder="Enter patient's full name"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  placeholder="Enter contact number"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2"
            >
              <span className="text-xl">✅</span>
              Add Patient
            </button>
          </form>
        </div>

        {/* Patients List */}
        <div className="bg-blue-100 shadow-lg shadow-white rounded-xl overflow-hidden">
          <div className="bg-blue-500 p-6">
            <h2 className="text-2xl font-bold text-black flex items-center gap-2">
            <span className="text-2xl">👥</span>
              Patients List
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search patients by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-500 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-gray-100 rounded-xl p-4 border border-blue-300 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{patient.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <Calendar size={16} />
                          Age: {patient.age}
                        </p>
                        <p className="flex items-center gap-2">
                          <Users size={16} />
                          Gender: {patient.gender}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone size={16} />
                          {patient.contact}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      >
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

export default Patient;