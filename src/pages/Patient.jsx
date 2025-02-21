import React, { useState, useEffect } from "react";
import { Trash2, Edit2, CheckCircle, Search } from "lucide-react";

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
      setError("An error occurred while fetching patients.");
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
    <div className="ml-[20%] grid grid-cols-2 gap-10 h-[100vh] p-10 bg-gray-100">
      {/* Add Patient Form */}
      <div className="p-8 bg-gradient-to-r from-blue-200 to-blue-50 shadow-lg rounded-xl border border-gray-300 text-black">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">➕ PATIENT</h1>
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 block w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            <CheckCircle size={20} /> Add Patient
          </button>
        </form>
      </div>

      <div className="p-8 bg-gradient-to-r from-blue-200 to-blue-50 shadow-lg rounded-xl border border-gray-300 text-black">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📝 PATIENTS LIST</h2>
        
        <div className="mb-4 flex items-center gap-2">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
          <ul className="space-y-4">
            {filteredPatients.map((patient) => (
              <li
                key={patient.id}
                className="p-4 bg-white rounded-lg flex justify-between items-center border border-gray-300 shadow-sm"
              >
                <div>
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Age:</strong> {patient.age}</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                  <p><strong>Contact:</strong> {patient.contact}</p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2">
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(patient.id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Patient;
