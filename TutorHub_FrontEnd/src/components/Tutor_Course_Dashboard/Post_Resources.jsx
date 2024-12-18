import { useState, useEffect } from 'react';
import { downloadIcon } from "../../assets/assets";

function Resources({programId}){
    const [textBooks, setTextBooks] = useState([]);
    const [sampleExams, setSampleExams] = useState([]);
    const [videoResources, setVideoResources] = useState([]);

    const [newTextBook, setNewTextBook] = useState({name: '' , url: ''});
    const [newSampleExam, setNewSampleExam] = useState({name: '' , url: ''});
    const [newVideo, setNewVideo] = useState({name: '' , url: ''});

    const handleTextBookNameChange = (event) => {
        setNewTextBook(prevState => ({ ...prevState, name: event.target.value }));
    }
    const handleTextBookUrlChange = (event) => {
        setNewTextBook(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleTextBookShare = () => {
        setTextBooks([...textBooks, newTextBook]);
        setNewTextBook({ name: '', url: '' });
    }
    /////////////////////////////////////////////////////////////////////////////
    const handleSampleExamNameChange = (event) => {
        setNewSampleExam(prevState => ({ ...prevState, name: event.target.value }));
    }
    const handleSampleExamUrlChange = (event) => {
        setNewSampleExam(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleSampleExamShare = () => {
        setSampleExams([...sampleExams, newSampleExam]);
        setNewSampleExam({ name: '', url: '' });
    }
    /////////////////////////////////////////////////////////////////////////////
    const handleVideoNameChange = (event) => {
        setNewVideo(prevState => ({ ...prevState, name: event.target.value }));
    }
    const handleVideoUrlChange = (event) => {
        setNewVideo(prevState => ({ ...prevState, url: event.target.value }));
    }
    const handleVideoShare = () => {
        setVideoResources([...videoResources, newVideo]);
        setNewVideo({ name: '', url: '' });
    }

    //   useEffect(() => {
    //     fetch(`API ENDPOINT TO GET COURSE INFO/${programId}`)
    //     .then(response => response.json())
    //     .then(data => {
    //        setTextBooks(data.textBooks);
    //        setSampleExams(data.sampleExams);
    //        setVideoResources(data.videoResources);
    //     });
    // }, [programId]);

    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>TextBooks</h2>
                <input className='resource-input' type="text" value={newTextBook.name} onChange={handleTextBookNameChange} placeholder="Resource name" />
                <input className='resource-input' type="text" value={newTextBook.url} onChange={handleTextBookUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleTextBookShare}>Add</button>
                <ul>
                    {textBooks.map((textBook, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{textBook.name}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${textBook.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))}
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Sample Exams</h2>
                <input className='resource-input' type="text" value={newSampleExam.name} onChange={handleSampleExamNameChange} placeholder="Resource name" />
                <input className='resource-input' type="text" value={newSampleExam.url} onChange={handleSampleExamUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleSampleExamShare}>Share</button>
                <ul>
                    {sampleExams.map((sampleExam, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{sampleExam.name}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${sampleExam.url}`, '_blank')} />
                            </div>    
                        </li>
                    ))} 
                </ul>
            </div>

            <div className="resources-content-box">
                <h2>Video Resources</h2>
                <input className='resource-input' type="text" value={newVideo.name} onChange={handleVideoNameChange} placeholder="Resource name" />
                <input className='resource-input' type="text" value={newVideo.url} onChange={handleVideoUrlChange} placeholder="Resource URL" />
                <button className='resource-button' onClick={handleVideoShare}>Share</button>
                <ul>
                    {videoResources.map((video, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{video.name}</p>
                                <img src={downloadIcon} onClick={() => window.open(`https://${video.url}`, '_blank')} />
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
                    Share Resources
                </button>
            </div>
        </div>
    );
}

export default Resources;