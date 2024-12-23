import { useState, useEffect } from 'react';
import axios from 'axios';

function ApproveRequests({programId}){
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/course/pending_enrollment_request/${programId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                setRequests(response.data);
            } catch (error) {
                console.error('There was an error fetching the enrollment requests!', error);
            }
        };

        fetchRequests();
    }, []);

    const handleFileDownload = async (request) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/course/get_receipt/${request.courseId}/${request.user.id}`, 
                {
                    responseType: 'blob',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `PAYMENT RECEIPT ${request.user.id}.pdf`); 
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('There was an error downloading the file!', error);
        }
    };

    const handleApprove = async (request) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/course/approve_enrollment_request/${request.courseId}/${request.user.id}`,
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );
            setRequests(requests.filter(r => r.id !== request.id));
        } catch (error) {
            console.error('There was an error approving the request!', error);
        }
    };

    const handleReject = (request) => {
    };

    return (
        <div className='approve-request-container'>
            {requests.length === 0 ? (
                <p>No enrollment requests.</p>
            ) : (
                <ul>
                    {requests.map(request => (
                        <li key={request.id}>
                            <p>{request.user.firstName} {request.user.lastName} has requested to enroll</p>
                            <div className='approve-button-container'>
                            
                            <button className='approve-request-button' onClick={() => handleFileDownload(request)}>
                                Download Receipt
                            </button>
                            <button className='approve-request-button' onClick={() => handleApprove(request)}>Approve</button>
                            <button className='reject-request-button' onClick={() => handleReject(request)}>Reject</button>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApproveRequests;