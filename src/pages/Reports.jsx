import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, CheckCircle, X } from "lucide-react";

//Backend API
const Reports = () => {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patient_id: '',
    name: '',
    main_complaint: '',
    symptoms: '',
    medical_history: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchReports();
    fetchPatients();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get('http://localhost/backend/patient_management.php?endpoint=patient_reports');
      setReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost/backend/patient_management.php?endpoint=patients');
      setPatients(response.data);
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
      await axios.post('http://localhost/backend/patient_management.php?endpoint=patient_reports', formData);
      fetchReports();
      setFormData({ patient_id: '', name: '', main_complaint: '', symptoms: '', medical_history: '' });
    } catch (error) {
      console.error('Error saving report:', error);
    }
  };

  const handleDelete = async (report_id) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;
    try {
      await axios.delete('http://localhost/backend/patient_management.php?endpoint=patient_reports', {
        data: { report_id },
      });
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const handleEdit = (report) => {
    setEditData(report);
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost/backend/patient_management.php?endpoint=patient_reports", editData);
      alert("Report Updated Successfully!");
      setEditMode(false);
      fetchReports();
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };

  //Frontend Elements
  return (
    <div className='ml-[18%] grid grid-cols-2 gap-x-10 h-screen bg-gray-100 p-8'>
        {/* Form Section */}
        <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">📝 PATIENT REPORT</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Patient</label>
            <select name='patient_id' value={formData.patient_id} onChange={handleChange} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' required>
              <option value=''>Select Patient</option>
              {Array.isArray(patients) && patients.length > 0 ? (
                patients.map((patient) => (
                  <option key={patient.patient_id} value={patient.patient_id}>
                    {patient.name}
                  </option>
                ))
              ) : (
                <option disabled>No patients found</option>
              )}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Main Complaint</label>
            <input type='text' name='main_complaint' value={formData.main_complaint} onChange={handleChange} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Symptoms</label>
            <input type='text' name='symptoms' value={formData.symptoms} onChange={handleChange} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Medical History</label>
            <select name='medical_history' value={formData.medical_history} onChange={handleChange} className='mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500' required>
              <option value=''>Select</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-blue-700 flex items-center justify-center gap-2 cursor-pointer '>
            <CheckCircle size={20}/>Save Report
          </button>
        </form>
      </div>

       {/* Form Section */}
       <div className="px-10 py-12 bg-white shadow-2xl w-full mx-auto rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">👥 PATIENT LIST</h2>
        <ul className='space-y-2'>
        {Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
            <li key={report.report_id} className='border border-gray-400 rounded-lg p-4 bg-gray-50'>
              <div>
                <p><strong>Patient ID:</strong> {report.patient_id}</p>
                <p><strong>Name:</strong> {report.name}</p>
                <p><strong>Main Complaint:</strong> {report.main_complaint}</p>
                <p><strong>Symptoms:</strong> {report.symptoms}</p>
                <p><strong>Medical History:</strong> {report.medical_history}</p>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button onClick={() => handleEdit(report)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 cursor-pointer ">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(report.report_id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 cursor-pointer ">
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No reports found.</p>
        )}
        </ul>
      </div>
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-1/3 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button onClick={() => setEditMode(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer ">
              <X size={24} />
            </button>
            <h1 className="text-2xl font-bold text-blue-700 mb-6">✏️ Edit Report</h1>
            {["main_complaint", "symptoms"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700">{field.replace("_", " ").toUpperCase()}</label>
                <input
                  type="text"
                  name={field}
                  value={editData?.[field]}
                  onChange={handleEditChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-gray-700">Medical History</label>
              <select
                name="medical_history"
                value={editData?.medical_history}
                onChange={handleEditChange}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <br />
          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold shadow-md transition duration-300 hover:bg-green-700 flex items-center justify-center gap-2 cursor-pointer ">
              <CheckCircle size={20} />
              Save Changes
          </button>
        </div>
      </div>
    )}
    </div>
  );
};

export default Reports;