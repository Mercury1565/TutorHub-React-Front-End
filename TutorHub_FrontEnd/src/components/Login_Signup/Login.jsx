import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import '../../styles/Login_Signup.css';
import { googleIcon } from '../../assets/assets.js';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const Login = ({setUserUserType }) => {
  const navigate_to = useNavigate();
  const [userType, setUserType] = useState('')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please fill all the fields');
      return;
    }

    if (userType === '') {
      alert('Please select role to continue');
      return;
    }
    try {
      const response = await axios.post(
        `${baseUrl}user/login`,
        {
          email,
          password,
        }
      );
      if (userType === 'student') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', 'student');
        setUserUserType('student');
        navigate_to('/student');
      } else if (userType === 'tutor') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userType', 'tutor');
        setUserUserType('tutor');
        navigate_to('/tutor');
      } 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login_container">
      <div className="middle">
        <div className="inputs">
          <div className="login-input">
            <div>
              <p>Email</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="login-input">
            <p>Password</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="remember">
          <div className="user-type">
            <label>
              <input
                type="radio"
                value="student"
                checked={userType === 'student'}
                onChange={handleUserTypeChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                value="tutor"
                checked={userType === 'tutor'}
                onChange={handleUserTypeChange}
              />
              Tutor
            </label>
          </div>
          <a href="#" className="forgot">
            Forgot Password?
          </a>
        </div>

        <div className="signup">
          <button className="signin" onClick={handleSignIn}>
            Sign In
          </button>
          <div className="new-class">
            <p>Don't have an account? &nbsp; </p>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
