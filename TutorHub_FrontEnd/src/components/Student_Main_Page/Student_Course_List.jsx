import {useState, useEffect} from "react";
import Enrolled_Course_Card from "./Enrolled_Course_Card";
import "../../styles/Student_Course_List/Student_Course_List.css";
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';

function Student_Course_List(){
    const [programs, setPrograms] = useState([1,3,4,5,6,7]);

    // useEffect(() => {
    //     // Fetch courses from the server when the component mounts
    //     axios.get('YOUR_SERVER_ENDPOINT_FOR_COURSES')
    //         .then(response => {
    //             setPrograms(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }, []);

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