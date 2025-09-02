import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';
import './index.css'

const Navbar = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        removeToken();
        navigate('/login')
    }
    return (
        <div className="navbar" >
            <button className="logut-btn" onClick={onLogout} >Logout</button>
        </div>
    )
}

export default Navbar