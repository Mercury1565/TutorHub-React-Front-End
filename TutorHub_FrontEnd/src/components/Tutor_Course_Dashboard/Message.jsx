import { useState } from 'react';
// import axios from 'axios';

function Contact_Tutor(){
    const [messages, setMessages] = useState([
        { id: 1, studentId:1, studentName: 'John Doe', text: 'Hello, I have a question about the homework.' },
        { id: 2, studentId:2, studentName: 'Jane Smith', text: 'Can you explain the last lecture again?' },
        { id: 3, studentId:3, studentName: 'Bob Johnson', text: 'I need help with an assignment.' },
    ]);
    const [students, setStudents] = useState([
        { id: 1, name: 'Hermon'},
        { id: 2, name: 'Eba'},
        { id: 3, name: 'Johna'},
    ])

    const [replyToId, setReplyToId] = useState(null);
    const [reply, setReply] = useState('');
    const [selectedStudentId, setSelectedStudentId] = useState(1);
    const [message, setMessage] = useState('');


    const handleSendMessage = async () => {
        try {
            const response = await axios.post('API', { message, selectedStudentId });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleSendReply = async () => {
        try {
            const response = await axios.post('API', { reply, replyToId });
            console.log(response.data);
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
                {messages.map((message) => (
                    <div className='single-message-container' key={message.id}>
                        <h3>{message.studentName}</h3>
                        <p>{message.text}</p>
                        {replyToId !== message.id && (
                            <button onClick={() => setReplyToId(message.studentId)}>Reply</button>
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
                            {student.name}
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