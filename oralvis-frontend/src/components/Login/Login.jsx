import { useState } from 'react';
import axios from 'axios';
import { setToken } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import './index.css'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { email, password });
      // console.log(res)
      setToken(res.data.token);
      // console.log(res.data.token.split('.'))
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      console.log(payload.role)
      if (payload.role === 'Technician') navigate('/upload');
      else if (payload.role === 'Dentist') navigate('/viewer');
      else setError('Invalid role');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className='login-container' >
      <div className='login-form-container'>
        <img src='https://res.cloudinary.com/dad6116nc/image/upload/v1756800523/logoN_e1gxwa.png' alt="website logo" className='website-logo' />
        <form onSubmit={onSubmit} className='form'>
          <input className='input-box' value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input className='input-box' type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          {error && <p className='error-msg' >{error}</p>}
          <button className='login-btn' type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
