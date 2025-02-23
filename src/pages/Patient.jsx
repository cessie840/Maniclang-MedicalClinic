import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, CheckCircle,X } from "lucide-react";

//Backend API
  const Patient = () => {
    const [patients, setPatients] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      age: '',
      gender: '',
      contact: ''
    });
  
    const API_URL = 'http://localhost/backend/patient_management.php?endpoint=patients';
  
    useEffect(() => {
      fetchPatients();
    }, []);
  
    const fetchPatients = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    const handleEdit = (patient) => {
      setFormData(patient);
      setEditMode(true);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert('Patient added successfully!');
          setFormData({ name: '', age: '', gender: '', contact: '' });
          fetchPatients(); // Refresh patient list
        } else {
          alert('Failed to add patient.');
        }
      } catch (error) {
        console.error('Error adding patient:', error);
      }
    };
  
    const handleDelete = async (patient_id) => {
      if (!window.confirm('Are you sure you want to delete this patient?')) return;
  
      try {
        const response = await fetch(API_URL, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ patient_id })
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert('Patient deleted successfully!');
          fetchPatients(); 
        } else {
          alert('Failed to delete patient.');
        }
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    };

    const handleUpdate = async () => {
      try {
        const response = await fetch(API_URL, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
  
        if (result.success) {
          alert("Patient updated successfully!");
          setEditMode(false);
          fetchPatients();
        } else {
          alert("Failed to update patient.");
        }
      } catch (error) {
        console.error("Error updating patient:", error);
      }
    };

  //Frontend Elements
  return (
    <div className='ml-[18%] grid grid-cols-2 gap-x-10 h-screen bg-gray-100 p-8'>
      {/* Add Patient Form */}
      <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">➕ ADD PATIENT</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Age</label>
            <input
              type='number'
              name='age'
              value={formData.age}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            >
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Contact</label>
            <input
              type='text'
              name='contact'
              value={formData.contact}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer '>
            <CheckCircle size={20} />Add Patient
          </button>
        </form>
      </div>

      {/* Patient List */}
      <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">📝 PATIENTS LIST</h2>
        <ul className='space-y-2'>
        {Array.isArray(patients) && patients.length ? (
              patients.map((patient) => (
                <li
                  key={patient.patient_id}
                  className='border border-gray-400 rounded-lg p-4 bg-gray-50'
                >
                  <div>
                    <p><strong>Name:</strong> {patient.name}</p> 
                    <p><strong>Age:</strong> {patient.age}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Contact:</strong> {patient.contact}</p>
                    <div className='justify-end bottom-3 right-3 flex gap-2'>
                    {/*Edit Button*/}
                    <button onClick={() => handleEdit(patient)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer ">
                      <Edit2 size={18} />
                    </button>
                    {/*Edit Button*/}
                    <button onClick={() => handleDelete(patient.patient_id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer '> 
                      <Trash2 size={18}/>
                    </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p>No patients found.</p>
            )}
        </ul>
      </div>
      {/* Edit Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button onClick={() => setEditMode(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer ">
              <X size={24} />
            </button>

            <h1 className="text-2xl font-bold text-blue-700 mb-6">✏️ Edit Patient</h1>
            <form className="space-y-4">
              <input type="hidden" name="patient_id" value={formData.patient_id} />

              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} required className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <br />
              <button type="button" onClick={handleUpdate} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-green-700 flex items-center justify-center gap-2 cursor-pointer ">
                <CheckCircle size={20} />
                Update Patient
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;