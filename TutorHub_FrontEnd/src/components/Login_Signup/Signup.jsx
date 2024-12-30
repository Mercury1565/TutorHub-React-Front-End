import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/Login_Signup.css';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

export const Signup = ({ setUserUserType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName || !userName) {
      alert('Please fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await axios.post(
        `${baseUrl}user/create-Account`,
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        }
      );

      navigate('/login');
    } catch (error) {
      alert('Error in creating account');
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
          <div className="login-input">
            <p>Confirm Password</p>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
