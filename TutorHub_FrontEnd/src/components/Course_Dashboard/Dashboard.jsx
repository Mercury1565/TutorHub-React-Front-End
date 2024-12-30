import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Course_Dashboard/Dashboard.css';
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';

import Greeting from './Greeting.jsx';
import Resources from './Resources.jsx';
import Assesments from './Assesments.jsx';
import Course_Review from './Course_Review.jsx';
import Contact_Tutor from './Contact_Tutor.jsx';

function Dashboard(){
  const location = useLocation();
  const programId = location.state.programId;
  
  const [activeButton, setActiveButton] = useState('button1');
  
  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  }

  return (
    <div className='course-page-container'>
      <Course_Search_Head/>
      <div className="course-page-dashboard">
        <div className="course-page-sidebar">
          <button 
            id='button1'
            className={`course-page-sidebar-item ${activeButton === "button1" ? "course-page-sidebar-item active" : ""}`}
            onClick={() => handleClick("button1")}
            >
            Dashboard
          </button>
          <button 
              id='button2'
              className={`course-page-sidebar-item ${activeButton === "button2" ? "course-page-sidebar-item active" : ""}`}
              onClick={() => handleClick("button2")}
              >
              Resources
          </button>
          <button 
              id='button3'
              className={`course-page-sidebar-item ${activeButton === "button3" ? "course-page-sidebar-item active" : ""}`}
              onClick={() => handleClick("button3")}
              >
              Assesments
          </button>
          <button 
              id='button4'
              className={`course-page-sidebar-item ${activeButton === "button4" ? "course-page-sidebar-item active" : ""}`}
              onClick={() => handleClick("button4")}
              >
              Reviews
          </button>
          <button 
              id='button5'
              className={`course-page-sidebar-item ${activeButton === "button5" ? "course-page-sidebar-item active" : ""}`}
              onClick={() => handleClick("button5")}
              >
              Contact Tutor
          </button>
        </div>

        {activeButton === "button1" && <Greeting programId={programId}/>}
        {activeButton === "button2" && <Resources programId={programId}/>}
        {activeButton === "button3" && <Assesments programId={programId}/>}
        {activeButton === "button4" && <Course_Review programId={programId}/>}
        {activeButton === "button5" && <Contact_Tutor programId={programId}/>}
        
      </div>
    </div>
  );
};

export default Dashboard;
