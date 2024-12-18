import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";

function Assesments(){
    const [exams, setExams] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const [newExam, setNewExam] = useState({name: '' , url: ''});
    const [newAssignment, setNewAssignment] = useState({name: '' , url: ''});

    /////////////////////////////////////////////////////////////////////////
    const handleExamNameChange = (event) => {
        setNewExam(prevState => ({ ...prevState, name: event.target.value }));
    }
    const handleExamUrlChange = (event) => {
        setNewExam(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleExamShare = () => {
        setExams([...exams, newExam]);
        setNewExam({ name: '', url: '' });
    }
    /////////////////////////////////////////////////////////////////////////
    const handleAssignmentNameChange = (event) => {
        setNewAssignment(prevState => ({ ...prevState, name: event.target.value }));
    }
    const handleAssignmentUrlChange = (event) => {
        setNewAssignment(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleAssignmentShare = () => {
        setAssignments([...assignments, newAssignment]);
        setNewAssignment({ name: '', url: '' });
    }
    //////////////////////////////////////////////////////////////////////////

    //   useEffect(() => {
    //     fetch(`API ENDPOINT TO GET COURSE INFO/${programId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //        setExams(data.exams);
    //        setAssignments(data.assignments);
    //     });
    // }, [programId]);

    // This is a funciton to be called when the share button is pressed
    // const handlePushToServer = () => {
    //     axios.post('YOUR_SERVER_ENDPOINT', assignments)
    //         .then(response => {
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error('There was an error!', error);
    //         });
    // }

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>Exams</h2>
                <input className='resource-input' type="text" value={newExam.name} onChange={handleExamNameChange} placeholder="Resource name" />
                <input className='resource-input' type="text" value={newExam.url} onChange={handleExamUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleExamShare}>Add</button>
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
                <input className='resource-input' type="text" value={newAssignment.name} onChange={handleAssignmentNameChange} placeholder="Resource name" />
                <input className='resource-input' type="text" value={newAssignment.url} onChange={handleAssignmentUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleAssignmentShare}>Add</button>
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

            <div>
                <button
                    className="share-button"
                    // onClick={handlePushToServer}
                >
                    Share Assesments
                </button>
            </div>
        </div>

    );
}

export default Assesments;