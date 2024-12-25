import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Assesments({programId}){
    const [exams, setExams] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [newExam, setNewExam] = useState({title: '' , url: ''});
    const [newAssignment, setNewAssignment] = useState({title: '' , url: ''});

    const [fetchTrigger, setFetchTrigger] = useState(false);     

    /////////////////////////////////////////////////////////////////////////
    const handleExamNameChange = (event) => {
        setNewExam(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleExamUrlChange = (event) => {
        setNewExam(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleExamShare = async() => {
        try {
            const response = await axios.post(
                `${baseUrl}assessment`, 
                {
                    type: 'exam',
                    courseId: programId,
                    ...newExam
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            if (response.status === 201) {
                setExams([...exams, newExam]);
                setNewExam({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error adding the exam!", error);
        }
    }
    /////////////////////////////////////////////////////////////////////////
    const handleAssignmentNameChange = (event) => {
        setNewAssignment(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleAssignmentUrlChange = (event) => {
        setNewAssignment(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleAssignmentShare = async() => {
        try {
            const response = await axios.post(
                `${baseUrl}assessment`, 
                {
                    type: 'assignment',
                    courseId: programId,
                    ...newAssignment
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            if (response.status === 201) {
                setAssignments([...assignments, newAssignment]);
                setNewAssignment({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error adding the assignment!", error);
        }
    }
    //////////////////////////////////////////////////////////////////////////
    
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}assessment/${programId}`, 
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
    }, [fetchTrigger]);

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>Exams</h2>
                <input className='resource-input' type="text" value={newExam.title} onChange={handleExamNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newExam.url} onChange={handleExamUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleExamShare}>Add</button>
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
                <input className='resource-input' type="text" value={newAssignment.title} onChange={handleAssignmentNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newAssignment.url} onChange={handleAssignmentUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleAssignmentShare}>Add</button>
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

            {/* <div>
                <button
                    className="share-button"
                    // onClick={handlePushToServer}
                >
                    Share Assesments
                </button>
            </div> */}
        </div>

    );
}

export default Assesments;