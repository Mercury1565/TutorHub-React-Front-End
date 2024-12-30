import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Contact_Tutor({programId}){
    const [conversations, setConversation] = useState([]);
    const [students, setStudents] = useState([])

    const [replyToId, setReplyToId] = useState(null);
    const [reply, setReply] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const r1 = await axios.get(
                    `${baseUrl}course/get_messages/${programId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                const r2 = await axios.get(
                    `${baseUrl}course/students/${programId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );

                setConversation(r1.data);
                setStudents(r2.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchConversation();
    }, []);

    const handleSendMessage = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}course/send_message`,
                { 
                    message, 
                    courseId: programId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setMessage('');
            alert('Message sent susccessfully');
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSendReply = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${baseUrl}course/send_reply`,
                { 
                    message: reply,
                    parentId: replyToId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setReply('');
            setReplyToId(null);
        } catch (error) {
            console.error(error);
        }
    };


    return(
        <div className="course-page-main-content">
            <div className="send-message-container">
                <h2>Messages</h2>
                {conversations.map((message) => (
                    <div className='single-message-container' key={message.id}>
                        <h3>{message.sender.firstName + ' ' + message.sender.lastName}</h3>
                        <p>{message.message}</p>
                        {replyToId !== message.id && (
                            <button onClick={() => setReplyToId(message.id)}>Reply</button>
                        )}

                        {replyToId === message.id && (
                            <form onSubmit={handleSendReply}>
                                <textarea value={reply} onChange={(e) => setReply(e.target.value)} placeholder='Write reply...' />
                                <button 
                                type="submit"
                                onClick={handleSendReply}
                                >
                                    Send</button>
                            </form>
                        )}
                    </div>
                ))}
            </div>

            <div className="send-message-container">
                <h2> Contact Student </h2>

                <select className='student-select' value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.firstName + ' ' + student.lastName}
                        </option>
                    ))}
                </select>

                <textarea
                    type="text" 
                    placeholder="Write message..."
                    className="review-textfield"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    />
                <div className="send-but-div">
                    <button className="review-submit-but" onClick={handleSendMessage}>
                        Send Message
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Contact_Tutor;