import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';
import { Trash2, Edit2, CheckCircle, X } from "lucide-react";

//Backend API
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

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

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
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await axios.delete('http://localhost/backend/patient_management.php?endpoint=clinical_data', 
      { data: { clinical_id }});
      setClinicalDataList(clinicalDataList.filter(data => data.clinical_id !== clinical_id));
    } catch (error) {
      console.error('Error deleting clinical data:', error);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost/backend/patient_management.php?endpoint=clinical_data", editData);
      alert("Clinical Data Updated Successfully!");
      setEditMode(false);
      fetchClinicalData(); // Refresh Data
    } catch (error) {
      console.error("Error updating clinical data:", error);
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
      const response = await axios.post("http://localhost/backend/patient_management.php?endpoint=clinical_data", clinicalData, {
        headers: { "Content-Type": "application/json" }
      });
  
      alert("Clinical Data Added!");
      setClinicalData({
        patient_id: '',
        heart_rate: '',
        blood_pressure: '',
        diagnosis: '',
        prescription: ''
      });
  
      fetchClinicalData(); // Refresh list
    } catch (error) {
      console.error("Error adding clinical data:", error);
    }
  };

  return (
    //Frontend Elements
    <div className="ml-[18%] grid grid-cols-2 gap-x-10 h-screen bg-gray-100 p-8">
       <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-3">
          <FaUserPlus className="text-blue-700" />ADD CLINICAL DATA</h1>
        <form className='space-y-5' onSubmit={handleAddClinicalData}>
          <div>
            <label className='block text-sm font-semibold text-gray-700'>Select Patient</label>
            <select name='patient_id' value={clinicalData.patient_id} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} required>
              <option value=''>Select Patient</option>
              {Array.isArray(patients) && patients.length > 0 ? (
                patients.map(patient => (
                  <option key={patient.patient_id} value={patient.patient_id}>
                    {patient.name} (ID: {patient.patient_id})
                  </option>
                ))
              ) : (
                <option disabled>No patients found</option>
              )}
            </select>
          </div>
          {['heart_rate', 'blood_pressure', 'diagnosis', 'prescription'].map((field) => (
            <div key={field}>
              <label className='block text-sm font-semibold text-gray-700'>{field.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
              {field === 'prescription' ? (
                <textarea name={field} value={clinicalData[field]} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} required />
              ) : (
                <input type='text' name={field} value={clinicalData[field]} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' onChange={handleInputChange} required />
              )}
            </div>
          ))}
          <button type='submit' className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer '>
            <CheckCircle size={20}/>Save Clinical Data
          </button>
        </form>
      </div>

       {/* Right Section: Patient Report */}
       <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">📝CLINICAL DATA</h2>
        <ul className='space-y-4'>
        {Array.isArray(clinicalDataList) && clinicalDataList.length > 0 ? (
          clinicalDataList.map(data => (
            <li key={data.clinical_id} className='border border-gray-400 rounded-lg p-4 bg-gray-50'>
              <div>
                <p><strong>Patient ID:</strong> {data.patient_id}</p>
                <p><strong>Name:</strong> {patients.find(p => p.patient_id === data.patient_id)?.name || "Unknown Patient"}</p>
                <p><strong>Heart Rate:</strong> {data.heart_rate}</p>
                <p><strong>Blood Pressure:</strong> {data.blood_pressure}</p>
                <p><strong>Diagnosis:</strong> {data.diagnosis}</p>
                <p><strong>Prescription:</strong> {data.prescription}</p>
                <div className='justify-end bottom-3 right-3 flex gap-2'>
                  {/*Edit Button*/}
                <button onClick={() => handleEdit(data)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer ">
                    <Edit2 size={18} />
                </button>
                {/*Delete Button*/}
                <button onClick={() => handleDelete(data.clinical_id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer '>
                  <Trash2 size={18}/>
                </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>No clinical data found.</p>
        )}
        </ul>
      </div>
      {/*Edit*/}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
            <button onClick={() => setEditMode(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer ">
              <X size={24} />
            </button>
            <h1 className="text-2xl font-bold text-blue-700 mb-6">✏️ Edit Clinical Data</h1>
            <div>
              <label className="block text-sm font-medium text-gray-700">Heart Rate</label>
              <input type="text" name="heart_rate" value={editData?.heart_rate} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Blood Pressure</label>
              <input type="text" name="blood_pressure" value={editData?.blood_pressure} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Diagnosis</label>
              <input type="text" name="diagnosis" value={editData?.diagnosis} onChange={handleEditChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <label className="block text-sm font-medium text-gray-700">Prescription</label>
            <textarea
              name="prescription"
              value={editData?.prescription}
              onChange={handleEditChange}
              rows="4" // Controls the height
              className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-y"
            />
            <br />
            <button onClick={handleUpdate} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-green-700 flex items-center justify-center gap-2 cursor-pointer ">
              <CheckCircle size={20} />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalData;