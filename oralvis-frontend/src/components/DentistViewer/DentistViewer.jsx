import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import jsPDF from 'jspdf';
import Navbar from '../Navbar/NavBar';
import './index.css'

export default function DentistViewer() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/scans`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(res => setScans(res.data));
  }, []);

  const downloadPDF = (scan) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(`Patient: ${scan.patient_name} (${scan.patient_id})`, 10, 20);
    doc.text(`Scan Type: ${scan.scan_type} - Region: ${scan.region}`, 10, 30);
    doc.text(`Uploaded: ${new Date(scan.uploaded_at).toLocaleString()}`, 10, 40);

    // Fetch and add image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function () {
      doc.addImage(img, 'JPEG', 10, 50, 80, 80);
      doc.save(`report-${scan.patient_id}.pdf`);
    };
    img.src = scan.image_url;
  };

  return (
    <>
      <Navbar />
      <div className='patient-details-container' >
        <h1 className='patient-main-heading' >Reports</h1>
        <div className='overflow-container' >
          {scans.map(scan => (
            <div className='all-details' key={scan.id}>
              <img src={scan.image_url} alt="Scan" width={100} />
              <div className='patient-details' >
                <h3 className='patient-heading' >Patient Name:  </h3>
                <p className='details' >{scan.patient_name}</p>
              </div>
              <div className='patient-details'>
                <h3 className='patient-heading'>Scan Type: </h3>
                <p className='details'>{scan.scan_type} </p>
              </div>

              <button className='patient-btn' onClick={() => window.open(scan.image_url)}>View Full Image</button>
              <button className='patient-btn' onClick={() => downloadPDF(scan)}>Download Report</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
