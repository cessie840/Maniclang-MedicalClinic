import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClinicalData = () => {
  const [patients, setPatients] = useState([]);
  const [clinicalDataList, setClinicalDataList] = useState([]);
  const [clinicalData, setClinicalData] = useState({
    patient_id: '',
    heart_rate: '',
    blood_pressure: '',
    diagnosis: '',
    prescription: ''
  });

  useEffect(() => {
    fetchPatients();
    fetchClinicalData();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost/backend/patient_management.php?endpoint=patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchClinicalData = async () => {
    try {
      const response = await axios.get('http://localhost/backend/patient_management.php?endpoint=clinical_data');
      setClinicalDataList(response.data);
    } catch (error) {
      console.error('Error fetching clinical data:', error);
    }
  };

  const handleDelete = async (clinical_id) => {
    try {
      await axios.delete('http://localhost/backend/patient_management.php?endpoint=clinical_data', 
      { data: { clinical_id }});
      setClinicalDataList(clinicalDataList.filter(data => data.clinical_id !== clinical_id));
    } catch (error) {
      console.error('Error deleting clinical data:', error);
    }
  };

  const handleInputChange = (e) => {
    setClinicalData({ ...clinicalData, [e.target.name]: e.target.value });
  };

  const handleAddClinicalData = async (e) => {
    e.preventDefault();
    if (!clinicalData.patient_id) {
      alert('Please select a patient');
      return;
    }

    try {
      await axios.post('http://localhost/backend/patient_management.php?endpoint=clinical_data', clinicalData);
      alert('Clinical Data Added Successfully');
      setClinicalData({
        patient_id: '',
        heart_rate: '',
        blood_pressure: '',
        diagnosis: '',
        prescription: ''
      });
      fetchClinicalData();
    } catch (error) {
      console.error('Error adding clinical data:', error);
    }
  };

  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>Add Clinical Data</h1>
        <form className='space-y-5' onSubmit={handleAddClinicalData}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Select Patient</label>
            <select name='patient_id' value={clinicalData.patient_id} className='mt-1 block w-full p-2 border rounded-md' onChange={handleInputChange} required>
              <option value=''>Select Patient</option>
              {patients.map(patient => (
                <option key={patient.patient_id} value={patient.patient_id}>
                  {patient.name} (ID: {patient.patient_id})
                </option>
              ))}
            </select>
          </div>
          {['heart_rate', 'blood_pressure', 'diagnosis', 'prescription'].map((field) => (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700'>{field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
              {field === 'prescription' ? (
                <textarea name={field} value={clinicalData[field]} className='mt-1 block w-full p-2 border rounded-md' onChange={handleInputChange} required />
              ) : (
                <input type='text' name={field} value={clinicalData[field]} className='mt-1 block w-full p-2 border rounded-md' onChange={handleInputChange} required />
              )}
            </div>
          ))}
          <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'>
            Save Clinical Data
          </button>
        </form>
      </div>

      <div className='p-14 mt-10 overflow-y-auto'>
        <h2 className='text-2xl font-bold text-black mb-4'>Clinical Data</h2>
        <ul className='space-y-4'>
          {clinicalDataList.map(data => (
            <li key={data.clinical_id} className='p-4 border rounded-md bg-gray-100 flex justify-between items-start'>
              <div className='text-sm'>
                <p><strong>Patient ID:</strong> {data.patient_id}</p>
                <p><strong>Heart Rate:</strong> {data.heart_rate}</p>
                <p><strong>Blood Pressure:</strong> {data.blood_pressure}</p>
                <p><strong>Diagnosis:</strong> {data.diagnosis}</p>
                <p><strong>Prescription:</strong> {data.prescription}</p>
              </div>
              <div className='flex flex-col gap-2'>
                <button onClick={() => handleDelete(data.clinical_id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClinicalData;