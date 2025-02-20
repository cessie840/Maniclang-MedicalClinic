import React, { useState, useEffect } from 'react';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('http://localhost/PHP/view_patients.php');
      const data = await response.json();
      if (data.status === 'success') {
        setPatients(data.patients);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while fetching patients.');
    }
  };

  const handleAddPatient = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost/PHP/add_patient.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, gender, contact }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        fetchPatients();
        setName('');
        setAge('');
        setGender('');
        setContact('');
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while adding the patient.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('http://localhost/PHP/delete_patient.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        fetchPatients();
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred while deleting the patient.');
    }
  };

  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full mx-auto'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>ADD PATIENT</h1>
        <form className='space-y-5' onSubmit={handleAddPatient}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input
              type='text'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Age</label>
            <input
              type='number'
              name='age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select
              name='gender'
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
            />
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
            Add Patient
          </button>
        </form>
        {error && <p className='text-red-500 mt-4'>{error}</p>}
      </div>
      <div className='p-14 mt-10'>
        <h2 className='text-2xl font-bold text-black mb-4'>Patient List</h2>
        <ul className='space-y-2'>
          {patients.map((patient) => (
            <li key={patient.id} className='p-3 border rounded-md bg-gray-100 flex justify-between items-center'>
              <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Contact:</strong> {patient.contact}</p>
              </div>
              <button 
                onClick={() => handleDelete(patient.id)}
                className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Patient;
