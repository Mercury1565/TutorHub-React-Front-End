import {useState, useEffect} from "react";
import Ongoing_Course_Card from "./Ongoing_Course_Card.jsx";
import "../../styles/Student_Course_List/Student_Course_List.css";
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Tutor_Course_List(){
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.get(
            `${baseUrl}course/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem(
                        'token'
                    )}`,
                },
            }
        )
            .then(response => {
                setPrograms(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return(
        <div className="course-list-container">
            <Course_Search_Head/>

            <div className="welcome-div">
                <h1>Welcome Back!</h1>
            </div>

            <div className="enrolled-list-container">
                <h2>Continue Teaching...</h2>
                <div className="enrolled-program-list">
                    {programs.map((programId, index) => (
                        <Ongoing_Course_Card className='enrolled-course-card' key={index} program={programs[index]} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tutor_Course_List;