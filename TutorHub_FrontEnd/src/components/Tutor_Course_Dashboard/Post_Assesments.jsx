import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Assesments({programId}){
    const [exams, setExams] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [newExam, setNewExam] = useState({title: '' , url: '', dueDate: new Date()});
    const [newAssignment, setNewAssignment] = useState({title: '' , url: '', dueDate: new Date()});

    const [fetchTrigger, setFetchTrigger] = useState(false);     

    const [examDueDate, setExamDueDate] = useState(new Date());
    const [assignmentDueDate, setAssignmentDueDate] = useState(new Date());
    
    /////////////////////////////////////////////////////////////////////////
    const handleExamNameChange = (event) => {
        setNewExam(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleExamUrlChange = (event) => {
        setNewExam(prevState => ({ ...prevState, url: event.target.value }));
    }

    const handleExamDueDateChange = (date) => {
        setExamDueDate(date);
        setNewExam(prevState => ({ ...prevState, dueDate: date }));
    };

    const handleExamShare = async() => {
        if(!newExam.title || !newExam.url){
            alert("Please fill in all the fields!");
            return;
        }

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

    const handleAssignmentDueDateChange = (date) => {
        setAssignmentDueDate(date);
        setNewAssignment(prevState => ({ ...prevState, dueDate: date }));
    };    

    const handleAssignmentShare = async() => {
        if (!newAssignment.title || !newAssignment.url) {
            alert("Please fill in all the fields!");
            return;
        }

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
                <h2 >Exams</h2>
                <input className='resource-input' type="text" value={newExam.title} onChange={handleExamNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newExam.url} onChange={handleExamUrlChange} placeholder="Resource URL" />
                <div style={{ margin: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{ color: "#000222", fontSize: "13px" }}>DueDate: </p>
                    <DatePicker
                        selected={examDueDate}
                        value={newExam.dueDate}
                        onChange={handleExamDueDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>

                <button className='resource-button' onClick={handleExamShare}>Add</button>
                <ul>
                    {exams.map((exam, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <div className="resource-list-item-content">
                                    <p style={{fontWeight: "bold"}}>{exam.title}</p>
                                    <img src={linkIcon} onClick={() => window.open(`https://${exam.url}`, '_blank')} />
                                </div>
                                    <div style={{color: "#6d6c8f", fontSize:"15px"}}>DueDate: { new Date(exam.dueDate).toLocaleString()}</div>
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Assignments</h2>
                <input className='resource-input' type="text" value={newAssignment.title} onChange={handleAssignmentNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newAssignment.url} onChange={handleAssignmentUrlChange} placeholder="Resource URL" />
                <div style={{ margin: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{ color: "#000222", fontSize: "13px" }}>DueDate: </p>
                    <DatePicker
                        selected={assignmentDueDate}
                        value={newAssignment.dueDate}
                        onChange={handleAssignmentDueDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>
                
                <button className='resource-button' onClick={handleAssignmentShare}>Add</button>
                <ul>
                    {assignments.map((assignment, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <div className="resource-list-item-content">
                                    <p style={{fontWeight: "bold"}}>{assignment.title}</p>
                                    <img src={linkIcon} onClick={() => window.open(`https://${assignment.url}`, '_blank')} />
                                </div>
                                <div style={{color: "#6d6c8f", fontSize:"15px"}}>DueDate: { new Date(assignment.dueDate).toLocaleString()}</div>
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>
        </div>
    );
}

export default Assesments;