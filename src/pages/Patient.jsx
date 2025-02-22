import React, { useState, useEffect } from 'react';

const Patient = () => {
  const [patients, setPatients] = useState([]);
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

  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full mx-auto'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>ADD PATIENT</h1>
        <form className='space-y-5' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
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
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select
              name='gender'
              value={formData.gender}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
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
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'
          >
            Add Patient
          </button>
        </form>
      </div>

      <div className='p-14 mt-10'>
        <h2 className='text-2xl font-bold text-black mb-4'>Patient List</h2>
        <ul className='space-y-2'>
          {patients.length ? (
            patients.map((patient) => (
              <li
                key={patient.patient_id}
                className='p-3 border rounded-md bg-gray-100 flex justify-between items-center'
              >
                <div>
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Age:</strong> {patient.age}</p>
                  <p><strong>Gender:</strong> {patient.gender}</p>
                  <p><strong>Contact:</strong> {patient.contact}</p>
                </div>
                <button
                  onClick={() => handleDelete(patient.patient_id)}
                  className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p>No patients found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Patient;