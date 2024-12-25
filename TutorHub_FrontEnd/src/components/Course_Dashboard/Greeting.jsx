import { useState, useEffect } from 'react';

import '../../styles/Course_Dashboard/Dashboard.css';
import { starIcon, calendarIcon } from '../../assets/assets';

function Greeting({programId}){
    const [title , setTitle] = useState("Title");
    const [rating, setRating] = useState(0);

    return(
        <div className="course-page-main-content">
            <h1>Hello, [SAMPLE]</h1>
            <div className="greeting-program-info">
            <div className='greeting-text'>
                <h2>{programId.title}</h2>
                <p>By {programId.tutorName}</p>
                <div className="greeting-program-rating">
                    <span><img src={starIcon}/>{programId.rate}</span>
                </div>
            </div>
            <div className="greeting-next-session">
                <div className='calendar-icon-container'>
                    <img src={calendarIcon}/>
                </div>
                <div>
                    <h2>Next Session</h2>
                    <p>Lecture</p>
                    <p>July 23, 2024</p>
                    <p>9:00AM - 10:00AM</p>
                </div>
            </div>
        </div>
      </div>
    )
}

export default Greeting;