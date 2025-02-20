import React from 'react'

const Patient = () => {

  const patients = [
    { name: 'John Doe', age: 30, gender: 'Male', contact: '123-456-7890' },
    { name: 'Jane Smith', age: 25, gender: 'Female', contact: '987-654-3210' },
    { name: 'Alex Johnson', age: 40, gender: 'Other', contact: '555-666-7777' },
  ];

  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full mx-auto'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>ADD PATIENT</h1>
        <form className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input type='text' name='name' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Age</label>
            <input type='number' name='age' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Gender</label>
            <select name='gender' className='mt-1 block w-full p-2 border border-gray-300 rounded-md'>
              <option value=''>Select Gender</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Contact</label>
            <input type='text' name='contact' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
            Add Patient
          </button>
        </form>
      </div>
      <div className='p-14 mt-10'>
        <h2 className='text-2xl font-bold text-black mb-4'>Patient List</h2>
        <ul className='space-y-2'>
          {patients.map((patient, index) => (
            <li key={index} className='p-3 border rounded-md bg-gray-100 flex justify-between items-center'>
              <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Contact:</strong> {patient.contact}</p>
              </div>
              <button 
                onClick={() => handleDelete(index)}
                className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Patient
