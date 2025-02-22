import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className='ml-[20%] grid grid-cols-2 h-[100vh]'>
      <div className='px-14 pt-24 bg-white shadow-lg w-full mx-auto'>
        <h1 className='text-3xl font-extrabold text-black mb-6'>Patient Report</h1>
        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Patient</label>
            <select name='patient_id' value={formData.patient_id} onChange={handleChange} className='mt-1 block w-full p-2 border rounded-md' required>
              <option value=''>Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.patient_id} value={patient.patient_id}>{patient.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Main Complaint</label>
            <input type='text' name='main_complaint' value={formData.main_complaint} onChange={handleChange} className='mt-1 block w-full p-2 border rounded-md' required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Symptoms</label>
            <input type='text' name='symptoms' value={formData.symptoms} onChange={handleChange} className='mt-1 block w-full p-2 border rounded-md' required />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Medical History</label>
            <select name='medical_history' value={formData.medical_history} onChange={handleChange} className='mt-1 block w-full p-2 border rounded-md' required>
              <option value=''>Select</option>
              <option value='Yes'>Yes</option>
              <option value='No'>No</option>
            </select>
          </div>

          <button type='submit' className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700'>
            Save Report
          </button>
        </form>
      </div>

      <div className='p-14 mt-10'>
        <h2 className='text-2xl font-bold text-black mb-4'>Patient Reports</h2>
        <ul className='space-y-2'>
          {reports.map((report) => (
            <li key={report.report_id} className='p-3 border rounded-md bg-gray-100 flex justify-between items-center'>
              <div>
                <p><strong>Patient ID:</strong> {report.patient_id}</p>
                <p><strong>Name:</strong> {report.name}</p>
                <p><strong>Main Complaint:</strong> {report.main_complaint}</p>
                <p><strong>Symptoms:</strong> {report.symptoms}</p>
                <p><strong>Medical History:</strong> {report.medical_history}</p>
              </div>
              <button onClick={() => handleDelete(report.report_id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Reports;