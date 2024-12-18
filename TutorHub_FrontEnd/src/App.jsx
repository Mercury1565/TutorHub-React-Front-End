import React from 'react';
import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Course_Search_Main from './components/Search_Courses/Course_Search_Main.jsx';
import Course_Description_Card from './components/Course_Enroll/Course_Description_Card.jsx';
import Dashboard from './components/Course_Dashboard/Dashboard.jsx';
import Tutor_Dashboard from './components/Tutor_Course_Dashboard/Tutor_DashBoard.jsx';
import Student_Course_List from './components/Student_Main_Page/Student_Course_List.jsx';
import Tutor_Course_List from './components/Tutor_Main_Page/Tutor_Course_List.jsx';
import Tutor_Course_Add from './components/Tutor_Course_Add/Tutor_Course_Add.jsx';
import Login from './components/Login_Signup/Login.jsx';
import Signup from './components/Login_Signup/Signup.jsx';
import Tutor_Profile from './components/Profile/Tutor_Profile.jsx';
import LandingPage from './components/Landing_Page.jsx';

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  return (
    <>
      {/* <Course_Description_Card/> */}
      {/* <Details_Card/> */}
      <div className="app">
        <Router>
          <header>
            <NavBar user={userType} />
          </header>
          <div className="content">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              
              <Route path="/student" element={<Student_Course_List />} />

              {userType === 'student' && (
                <Route path="/student/dashboard" element={<Dashboard />} />
              )}
              {userType === 'student' && (
                <Route
                  path="/student/courses"
                  element={<Course_Search_Main />}
                />
              )}
              {userType === 'student' && (
                <Route
                  path="/program_details"
                  element={<Course_Description_Card />}
                />
              )}
              ////////////////////////////////////////////////////////
              <Route path="/tutor" element={<Tutor_Course_List />} />
              {userType === 'tutor' && (
                <Route path="/tutor/dashboard" element={<Tutor_Dashboard />} />
              )}
              {userType === 'tutor' && (
                <Route
                  path="/tutor/add_course"
                  element={<Tutor_Course_Add />}
                />
              )}
              {userType === 'tutor' && (
                <Route path="/tutor/profile" element={<Tutor_Profile />} />
              )}
              <Route
                path="/login"
                element={<Login setUserUserType={setUserType} />}
              />
              <Route
                path="/signup"
                element={<Signup setUserUserType={setUserType} />}
              />
            </Routes>
          </div>
        </Router>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
