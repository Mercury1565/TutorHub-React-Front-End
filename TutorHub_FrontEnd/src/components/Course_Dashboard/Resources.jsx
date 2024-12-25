import { useState, useEffect } from 'react';
import { downloadIcon } from "../../assets/assets";

function Resources({programId}){
    const textBooks = programId.resources.book;
    const sampleExams = programId.resources.sampleExam;
    const videoResources = programId.resources.video;
    
    return(
        <div className="course-page-main-content">
            <div className="resources-content-box">
                <h2>TextBooks</h2>
                <ul>
                    {textBooks.map((textBook, index) => (
                        <li key={index}>
                            <div className="resource-list-item">
                                <p>{textBook.title}</p>
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
                                <p>{sampleExam.title}</p>
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
                                <p>{video.title}</p>
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