import { starIcon, calendarIcon, downloadIcon, linkIcon } from '../../assets/assets';
import Course_Review from './See_Review.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Greeting({program}){
    const programName = program.title;
    const enrolled = program.seatsRemaining;
    const rating = program.rate;
    const tutorName = program.tutorName;

    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}assessment/all/${program.id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                const data = response.data;
                setSessions(data);
            } catch (error) {
                console.error("There was an error fetching the assessments!", error);
            }
        };

        fetchResources();
    }, []);

    const upcomingSessions = sessions
        .filter(session => new Date(session.dueDate) > new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    return(
        <div className="course-page-main-content" style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
            <div className="greeting-program-info">
                <h1>Hello, {tutorName}</h1>

                <div className='greeting-text'>
                    <h2>{programName}</h2>
                    <h3>Enrolled: {enrolled} Students</h3>
                    <div className="greeting-program-rating">
                        <span><img src={starIcon}/>{rating}</span>
                    </div>
                </div>
                <div className="greeting-next-session">
                    <div className='calendar-icon-container'>
                        <img src={calendarIcon}/>
                    </div>

                    <ul style={{padding: 0, width: '40%'}}>
                    {upcomingSessions.map((session, index) => (
                        <li key={index} style={{marginBottom: '10px'}} width='100%'>
                            <div className="resource-list-item_resource"  >
                                <div>
                                    <p style={{marginRight: '10px', marginBottom: '0px'}}>{session.title}</p>
                                    <p style={{fontSize: '12px', display: 'block'}}>
                                        {session.type === 'exam' ? 'Exam'
                                        : session.type === 'assignment' ? 'Assignment'
                                        : session.type === 'class' ? 'Class'
                                        : 'Unknown'}
                                    </p>
                                    <span style={{fontSize: '8px', display: 'block'}}>
                                        {new Date(session.dueDate).toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(session.dueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <img src={linkIcon} onClick={() => window.open(`${session.url}`, '_blank')} style={{cursor: 'pointer'}} />
                            </div>    
                        </li>
                    ))} 
                    </ul>
                </div>
            </div>
            <Course_Review programId={program.id} style={{width:'40%'}}/>
        </div>
    )
}

export default Greeting;