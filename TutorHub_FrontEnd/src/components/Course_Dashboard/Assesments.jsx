import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";
import axios from "axios";

function Assesments({ programId }){
    const [exams, setExams] = useState([]);
    const [assignments, setAssignments] = useState([]);
    
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/assessment/${programId.id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                const data = response.data;
                setExams(data.exams);
                setAssignments(data.assignments);
            } catch (error) {
                console.error("There was an error fetching the assessments!", error);
            }
        };

        fetchResources();
    }, []);


    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>Exams</h2>
                <ul>
                    {exams.map((exam, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{exam.title}</p>
                                <img src={linkIcon} onClick={() => window.open(`https://${exam.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Assignments</h2>
                <ul>
                    {assignments.map((assignment, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{assignment.title}</p>
                                <img src={linkIcon} onClick={() => window.open(`https://${assignment.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>
        </div>

    );
}

export default Assesments;