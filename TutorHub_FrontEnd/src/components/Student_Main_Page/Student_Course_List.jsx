import {useState, useEffect} from "react";
import Enrolled_Course_Card from "./Enrolled_Course_Card";
import "../../styles/Student_Course_List/Student_Course_List.css";
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Student_Course_List(){
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}student/course`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setPrograms(response.data);
            } catch (error) {
                console.error("There was an error fetching the courses!", error);
            }
        };

        fetchResources();
    }, []);

    return(
        <div className="course-list-container">
            <Course_Search_Head/>

            <div className="welcome-div">
                <h1>Welcome Back!</h1>
            </div>

            <div className="enrolled-list-container">
                <h2>Continue Learning...</h2>
                <div className="enrolled-program-list">
                    {programs.map((programId, index) => (
                        <Enrolled_Course_Card className='enrolled-course-card' key={index} programId={programId} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Student_Course_List;