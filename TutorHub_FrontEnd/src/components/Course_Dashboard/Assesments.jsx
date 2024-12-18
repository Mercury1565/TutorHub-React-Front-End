import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";

function Assesments(){
    const [exams, setExams] = useState([{name: "Sample", url:'www.google.com'}]);
    const [assignments, setAssignments] = useState([{name: "Sample", url:'www.google.com'}]);

    //   useEffect(() => {
    //     fetch(`API ENDPOINT TO GET COURSE INFO/${programId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //        setExams(data.exams);
    //        setAssignments(data.assignments);
    //     });
    // }, [programId]);

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>Exams</h2>
                <ul>
                    {exams.map((exam, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{exam.name}</p>
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
                                <p>{assignment.name}</p>
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