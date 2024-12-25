import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Search_Courses/Course_Card.css';

import Star from '../../assets/star.png';

function Course_Card({ programId }) {
  const navigate = useNavigate();

  function handleEnroll() {
    navigate('/program_details', { state: { programId } });
  }

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
            <p>{programId.review} Reviews</p>
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
          className="enroll-button"
          onClick={() => {
            handleEnroll();
          }}
        >
          Enroll Now
        </button>
        <span className="price">${programId.price}</span>
      </div>
    </div>
  );
}
export default Course_Card;
