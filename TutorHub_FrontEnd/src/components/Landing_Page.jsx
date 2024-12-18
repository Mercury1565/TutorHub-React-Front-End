import '../styles/Landing_Page.css';
import { logoFull, moto } from '../assets/assets';
import { useNavigate } from 'react-router-dom';


function LandingPage(){
    const navigate = useNavigate();
    const navigate_login = () => {
        navigate('/login');
    };

    return (
        <div className="landing-page-total">
            <div className="landing-page-cont">
            <div className='land-logo-cont'>
                <img src={logoFull} alt='logo'/>
            </div>
            <div className='logo-logo-cont'>
                <img src={moto} alt='logo'/>
            </div>
            <button 
                className='land-button'
                onClick={() => {navigate_login('/login')}}
            >
                    Get Started
            </button>
            </div>
        </div>
    );
}

export default LandingPage;