import { useState, useEffect } from 'react';
import { downloadIcon } from "../../assets/assets";

function Resources({programId}){
    const [textBooks, setTextBooks] = useState([{name: "Sample", url:'www.google.com'}]);
    const [sampleExams, setSampleExams] = useState([{name: "Sample", url:'www.google.com'}]);
    const [videoResources, setVideoResources] = useState([{name: "Sample", url:'www.google.com'}]);

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

           
        </div>

    );
}

export default Resources;