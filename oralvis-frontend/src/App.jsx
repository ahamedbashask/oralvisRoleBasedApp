import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import TechnicianUpload from './components/TechnicalUpload/TechnicianUpload';
import DentistViewer from './components/DentistViewer/DentistViewer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={['Technician']} />}>
          <Route path="/upload" element={<TechnicianUpload />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['Dentist']} />}>
          <Route path="/viewer" element={<DentistViewer />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
