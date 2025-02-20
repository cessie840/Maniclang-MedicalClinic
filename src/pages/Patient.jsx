import React, { useState, useEffect } from "react";
import { Trash2, Edit2, CheckCircle } from "lucide-react";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("http://localhost/PHP/view_patients.php");
      const data = await response.json();
      if (data.status === "success") {
        setPatients(data.patients);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while fetching patients.");
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost/PHP/add_patient.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, gender, contact }),
      });

      const data = await response.json();
      if (data.status === "success") {
        fetchPatients();
        setName("");
        setAge("");
        setGender("");
        setContact("");
        setSuccess("Patient added successfully! ✅");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("An error occurred while adding the patient.");
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
      <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-300">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">➕ ADD PATIENT</h1>
        <form className="space-y-5" onSubmit={handleAddPatient}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Contact</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
        {success && <p className="text-green-600 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* Patient List */}
      <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-300">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">📝 PATIENTS LIST</h2>

        {/* Border for Patient List */}
        <div className="border border-gray-400 rounded-lg p-4 bg-gray-50">
          <ul className="space-y-4">
            {patients.map((patient) => (
              <li
                key={patient.id}
                className="p-4 bg-white rounded-lg flex justify-between items-center border border-gray-300 shadow-sm"
              >
                <div>
                  <p className="text-gray-800">
                    <strong>Name:</strong> {patient.name}
                  </p>
                  <p className="text-gray-600">
                    <strong>Age:</strong> {patient.age}
                  </p>
                  <p className="text-gray-600">
                    <strong>Gender:</strong> {patient.gender}
                  </p>
                  <p className="text-gray-600">
                    <strong>Contact:</strong> {patient.contact}
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                  >
                    <Edit2 size={18} />
                  </button>

                  {/* Delete Button */}
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
