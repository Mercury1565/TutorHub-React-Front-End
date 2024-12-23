import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import '../../styles/Login_Signup.css';
import { googleIcon } from '../../assets/assets.js';
import axios from 'axios';

export const Signup = ({ setUserUserType }) => {
  const navigate_to = useNavigate();
  const [userType, setUserType] = useState('')

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSignUp = async () => {
    console.log({ email, password, firstName, lastName, userName });
    try {
      const response = await axios.post(
        `http://localhost:3000/user/create-Account`,
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <div className="login_container">
      <div className="middle">
        <div className="signup-text-cont">
          <h2>SignUp</h2>
        </div>

        <div className="inputs">
          <div className="login-input">
            <div>
              <p>First Name</p>
              <input
                type="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
          </div>
          <div className="login-input">
            <div>
              <p>Last Name</p>
              <input
                type="LastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="login-input">
            <div>
              <p>User Name</p>
              <input
                type="userName"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
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
        </div>

        <div className="signup">
          <button className="signin" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
