import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import Navbar from '../Navbar/NavBar';
import './index.css'

export default function TechnicianUpload() {
  const [form, setForm] = useState({
    patient_name: '', patient_id: '', scan_type: '', region: '', image: null
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('image', form.image);
    Object.keys(form).forEach((k) => {
      if (k !== 'image') data.append(k, form[k]);
    });


    try {
      console.log(form.image)
      await axios.post(`${import.meta.env.VITE_API_URL}/scans/upload`, data, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      // console.log("api done")
      setMsg('Upload successful');
    } catch (err) {
      console.log("Upload failed:", err.response?.data || err.message);
      setMsg('Upload failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className='upload-page-container' >
        <div className='upload-container' >
          <h1 className='heading' >Patient Upload</h1>
          <form onSubmit={handleSubmit} className='patient-details-form-container'>
            <label htmlFor='patientName' className='label-text'>Patient Name:</label>
            <input className='input-patient' id="patientName" name="patient_name" placeholder="Patient Name" onChange={handleChange} required />

            <label htmlFor='patientId' className='label-text'>Patient Id:</label>
            <input id="patientId" className='input-patient' name="patient_id" placeholder="Patient ID" onChange={handleChange} required />

            <label htmlFor='scanType' className='label-text'>Scan Type:</label>
            <input id='scanType' className='input-patient' name="scan_type" placeholder="Scan Type" onChange={handleChange} required />

            <label htmlFor='region' className='label-text'>Region:</label>
            <input id='region' className='input-patient' name="region" placeholder="Region" onChange={handleChange} required />

            <input name="image" type="file" accept="image/*" onChange={handleChange} required />
            <button className='upload-btn' type="submit">Upload</button>
            <div>{msg}</div>
          </form>
        </div>
      </div>
    </>
  );
}
