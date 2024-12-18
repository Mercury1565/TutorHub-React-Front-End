import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/Student_Course_List/Enrolled_Course_Card.css";

import Star from "../../assets/star.png";
import course_img_placeholder from "../../assets/error.png";

function Ongoing_Course_Card({program}){
    // const [courseImage, setCourseImage] = useState(course_img_placeholder);
    // const [subject , setSubject] = useState("Subject");
    // const [review , setReview] = useState(0.0);
    // const [title , setTitle] = useState("Title");
    // const [enrolled, setEnrolled] = useState("0");

    // {
    //   "id": "d2406813-3cc8-43da-84bc-29313279b5b6",
    //   "title": "Introduction to Programming",
    //   "description": "A beginner's course on programming concepts.",
    //   "tutorId": "316b418c-9cd5-49b4-b879-1d3245dc8ccd",
    //   "grade": 10,
    //   "fee": "100",
    //   "subject": "Computer Science",
    //   "durationPerDay": 2,
    //   "seatsRemaining": 30,
    //   "resources": {},
    //   "rate": "0",
    //   "image": "http://example.com/course-image.jpg"
    // },

    const courseImage = program.image;
    const subject = program.subject;
    const title = program.title;
    const enrolled = program.seatsRemaining;
    const review = program.rate;

    const navigate = useNavigate();

    function handleLearn(program){
      navigate('/tutor/dashboard', { state: { program } });
    };

    return (
        <div className="card">
          <div className="card-header">
            <img src={courseImage} alt="Instructor" />
          </div>

          <div className="card-badge">
            <p className="category">{subject}</p>

            <div className="rat">
                <div className="starContainer">
                    <img src={Star} alt="star" />
                    <p>{review} Reviews</p>
                </div>
            </div>
          </div>
    
          <div className="card-body">
            <span className="rating"></span>
            <h3 className="title">{title}</h3>
            <p className="instructor">Enrolled: {enrolled} Students</p>
          </div>

          <div className="card-footer">
            <button 
                className="learn-button" 
                onClick={() => {handleLearn(program)}}
                >
                Start Teaching
            </button>
          </div>
        </div>
      );
}
export default Ongoing_Course_Card;