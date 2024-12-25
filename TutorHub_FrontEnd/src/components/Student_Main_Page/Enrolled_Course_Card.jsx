import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Student_Course_List/Enrolled_Course_Card.css";

import Star from "../../assets/star.png";
import course_img_placeholder from "../../assets/error.png";

function Enrolled_Course_Card({programId}){

    const navigate = useNavigate();

    function handleLearn(programId){
      navigate('/student/dashboard', { state: { programId } });
    };

    return (
        <div className="card">
          <div className="card-header">
            <img src={programId.image} alt="Instructor" />
          </div>

          <div className="card-badge">
            <p className="category">{programId.subject}</p>

            <div className="rat">
                <div className="starContainer">
                    <img src={Star} alt="star" />
                    <p>{programId.rate} Reviews</p>
                </div>
            </div>
          </div>
    
          <div className="card-body">
            <span className="rating"></span>
            <h3 className="title">{programId.title}</h3>
            <p className="instructor">By {programId.tutorName}</p>
          </div>

          <div className="card-footer">
            <button 
                className="learn-button" 
                onClick={() => {handleLearn(programId)}}
                >
                Start Learning
            </button>
          </div>
        </div>
      );
}
export default Enrolled_Course_Card;