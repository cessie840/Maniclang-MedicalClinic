import React from 'react'

const ClinicalData = () => {
  const patients = [
    { name: 'John Doe', age: 30, gender: 'Male', mainComplaint: 'Masakit ang ulo' },
    { name: 'Jane Smith', age: 25, gender: 'Female', mainComplaint: 'Masakit ang ulo' },
    { name: 'Alex Johnson', age: 40, gender: 'Other', mainComplaint: 'Masakit ang ulo' },
  ];
  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full mx-auto'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>Clinical Data</h1>
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
            <label className='block text-sm font-medium text-gray-700'>Heart Rate</label>
            <input type='text' name='hr' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Blood Pressure</label>
            <input type='text' name='bp' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Diagnosis</label>
            <textarea type='text' name='diagnosis' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Presciption</label>
            <textarea type='text' name='prescription' className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Medical History</label>
            <select name='medical' className='mt-1 block w-full p-2 border border-gray-300 rounded-md'>
              <option value=''>Select</option>
              <option value='Male'>Yes</option>
              <option value='Female'>No</option>
            </select>
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
            Save Report
          </button>
        </form>
      </div>
      <div className='p-14 mt-10'>
        <h2 className='text-2xl font-bold text-black mb-4'>Patient Report</h2>
        <ul className='space-y-2'>
          {patients.map((patient, index) => (
            <li key={index} className='p-3 border rounded-md bg-gray-100 flex justify-between items-center'>
              <div>
                <p><strong>Name:</strong> {patient.name}</p>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Main Complaint:</strong> {patient.mainComplaint}</p>
              </div>
              <div className='flex gap-2'>
              <button 
                  onClick={() => handleEdit(index)}
                  className='bg-green-500 text-black px-3 py-1 rounded-md hover:bg-green-600'>
                  Edit/View
                </button>
                <button 
                  onClick={() => handleDelete(index)}
                  className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ClinicalData
