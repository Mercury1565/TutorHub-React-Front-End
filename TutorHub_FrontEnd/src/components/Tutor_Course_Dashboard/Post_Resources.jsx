import { useState, useEffect } from 'react';
import { downloadIcon } from "../../assets/assets";
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Resources({programId}){
    const [textBooks, setTextBooks] = useState([]);
    const [sampleExams, setSampleExams] = useState([]);
    const [videoResources, setVideoResources] = useState([]);

    const [newTextBook, setNewTextBook] = useState({title: '' , url: ''});
    const [newSampleExam, setNewSampleExam] = useState({title: '' , url: ''});
    const [newVideo, setNewVideo] = useState({title: '' , url: ''});

    const [fetchTrigger, setFetchTrigger] = useState(false);     

    const handleTextBookNameChange = (event) => {
        setNewTextBook(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleTextBookUrlChange = (event) => {
        setNewTextBook(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleTextBookShare = async() => {
        try {
            const response = await axios.post(
                `${baseUrl}course/${programId}/resources`, 
                {
                    type: 'book',
                    ...newTextBook
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
                setTextBooks([...textBooks, newTextBook]);
                setNewTextBook({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error adding the book!", error);
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    const handleSampleExamNameChange = (event) => {
        setNewSampleExam(prevState => ({ ...prevState, title: event.target.value }));
    }
    
    const handleSampleExamUrlChange = (event) => {
        setNewSampleExam(prevState => ({ ...prevState, url: event.target.value }));
    }
    
    const handleSampleExamShare = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}course/${programId}/resources`, 
                {
                    type: 'sample_exam',
                    ...newSampleExam
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
                setSampleExams([...sampleExams, newSampleExam]);
                setNewSampleExam({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error adding the sample exam!", error);
        }
    }
    /////////////////////////////////////////////////////////////////////////////
    const handleVideoNameChange = (event) => {
        setNewVideo(prevState => ({ ...prevState, title: event.target.value }));
    }
    const handleVideoUrlChange = (event) => {
        setNewVideo(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleVideoShare = async() => {
        try {
            const response = await axios.post(
                `${baseUrl}course/${programId}/resources`, 
                {
                    type: 'video',
                    ...newVideo
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

            console.log(response.status);
            if (response.status === 201) {
                setVideoResources([...videoResources, newVideo]);
                setNewVideo({ title: '', url: '' });
                setFetchTrigger((prev) => !prev);
            }
        } catch (error) {
            console.error("There was an error adding the video resource!", error);
        }
    }

    ///////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}course/${programId}/resources`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                const data = response.data;
                setTextBooks(data.book);
                setSampleExams(data.sampleExam);
                setVideoResources(data.video);
            } catch (error) {
                console.error("There was an error fetching the resources!", error);
            }
        };

        fetchResources();
    }, [fetchTrigger]);

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>TextBooks</h2>
                <input className='resource-input' type="text" value={newTextBook.title} onChange={handleTextBookNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newTextBook.url} onChange={handleTextBookUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleTextBookShare}>Add</button>
                <ul>
                    {textBooks.map((textBook, index) => (
                        <li key={index}>
                            <div className="resource-list-item_resource">
                                <p>{textBook.title}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${textBook.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))}
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Sample Exams</h2>
                <input className='resource-input' type="text" value={newSampleExam.title} onChange={handleSampleExamNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newSampleExam.url} onChange={handleSampleExamUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleSampleExamShare}>Share</button>
                <ul>
                    {sampleExams.map((sampleExam, index) => (
                        <li key={index}>
                            <div className="resource-list-item_resource">
                                <p>{sampleExam.title}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${sampleExam.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Video Resources</h2>
                <input className='resource-input' type="text" value={newVideo.title} onChange={handleVideoNameChange} placeholder="Resource title" />
                <input className='resource-input' type="text" value={newVideo.url} onChange={handleVideoUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleVideoShare}>Share</button>
                <ul>
                    {videoResources.map((video, index) => (
                        <li key={index}>
                            <div className="resource-list-item_resource">
                                <p>{video.title}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${video.url}`, '_blank')} />
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
                    Share Resources
                </button>
            </div> */}
        </div>
    );
}

export default Resources;