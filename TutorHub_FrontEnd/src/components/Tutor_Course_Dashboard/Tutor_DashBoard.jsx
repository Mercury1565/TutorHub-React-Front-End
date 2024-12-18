import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import '../../styles/Course_Dashboard/Tutor_Dashboard.css';
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';

import Tutor_Greeting from './Tutor_Greeting.jsx';
import Post_Resources from './Post_Resources.jsx';
import Post_Assesments from './Post_Assesments.jsx';
import See_Review from './See_Review.jsx';
import Message from './Message.jsx';

function Tutor_DashBoard(){
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
                Post Resources
            </button>
            <button 
                id='button3'
                className={`course-page-sidebar-item ${activeButton === "button3" ? "course-page-sidebar-item active" : ""}`}
                onClick={() => handleClick("button3")}
                >
                Post Assesments
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
                Contact Students
            </button>
          </div>
  
          {activeButton === "button1" && <Tutor_Greeting programId={programId}/>}
          {activeButton === "button2" && <Post_Resources programId={programId}/>}
          {activeButton === "button3" && <Post_Assesments programId={programId}/>}
          {activeButton === "button4" && <See_Review programId={programId}/>}
          {activeButton === "button5" && <Message/>}
          
        </div>
      </div>
    );
}

export default Tutor_DashBoard;