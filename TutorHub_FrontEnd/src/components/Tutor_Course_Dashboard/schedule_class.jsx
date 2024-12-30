import { useState, useEffect } from "react";
import { linkIcon } from "../../assets/assets";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const baseUrl = import.meta.env.VITE_BASE_URL;

function ScheduleClass({programId}){
    const [classes, setClasses] = useState([]);
    const [newClass, setNewClass] = useState({title: '' , url: '', dueDate: new Date()});

    const [fetchTrigger, setFetchTrigger] = useState(false);     

    const [classDate, setClassDate] = useState(new Date());
    
    /////////////////////////////////////////////////////////////////////////
    const handleClassNameChange = (event) => {
        setNewClass(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleClassUrlChange = (event) => {
        setNewClass(prevState => ({ ...prevState, url: event.target.value }));
    }

    const handleClassDateChange = (date) => {
        setClassDate(date);
        setNewClass(prevState => ({ ...prevState, dueDate: date }));
    };

    const handleClassShare = async() => {
        if(!newClass.title || !newClass.url){
            alert("Please fill in all the fields!");
            return;
        }

        try {
            const response = await axios.post(
                `${baseUrl}assessment`, 
                {
                    type: 'class',
                    courseId: programId,
                    ...newClass
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
                setClasses([...classes, newClass]);
                setNewClass({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error scheduling the class!", error);
        }
    }
    
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
                setClasses(data.classes);
            } catch (error) {
                console.error("There was an error fetching the assessments!", error);
            }
        };

        fetchResources();
    }, [fetchTrigger]);

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2 >Classes</h2>
                <input className='resource-input' type="text" value={newClass.title} onChange={handleClassNameChange} placeholder="Class title" />
                <input className='resource-input' type="text" value={newClass.url} onChange={handleClassUrlChange} placeholder="Class URL" />
                <div style={{ margin: '5px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p style={{ color: "#000222", fontSize: "13px" }}>DueDate: </p>
                    <DatePicker
                        selected={classDate}
                        value={newClass.dueDate}
                        onChange={handleClassDateChange}
                        showTimeSelect
                        dateFormat="Pp"
                    />
                </div>

                <button className='resource-button' onClick={handleClassShare}>Add</button>
                <ul>
                    {classes.map((c, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <div className="resource-list-item-content">
                                    <p style={{fontWeight: "bold"}}>{c.title}</p>
                                    <img src={linkIcon} onClick={() => window.open(`${c.url}`, '_blank')} />
                                </div>
                                    <div style={{color: "#6d6c8f", fontSize:"15px"}}>DueDate: { new Date(c.dueDate).toLocaleString()}</div>
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>
        </div>
    );
}

export default ScheduleClass;