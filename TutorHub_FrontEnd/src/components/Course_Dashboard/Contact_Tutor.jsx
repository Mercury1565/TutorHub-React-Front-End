import { useState, useEffect } from 'react';
import axios from 'axios';
import { linkedinIcon, emailIcon, telegramIcon } from "../../assets/assets";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Contact_Tutor({programId}){
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}course/get_student_messages/${programId.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                setConversation(response.data);
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
                    courseId: programId.id, 
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            setConversation([...conversation, response.data]);
            setMessage('');
            alert('Message sent successfully');
        } catch (error) {
            alert('Failed to send message');
        }
    };

    return(
        <div className="course-page-main-content">
            <div className="send-message-container">
                <h2> Contact Tutor </h2>
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

            <div className="send-message-container">
                <h2> Conversation </h2>
                <div className="conversation-container">
                    {conversation.map((msg, index) => (
                        <div key={index} className="conversation-message">
                            <p>{msg.message}</p>
                            {msg.replies && msg.replies.length > 0 && (
                                <div className="replies-container">
                                    {msg.replies.map((reply, replyIndex) => (
                                        <div key={replyIndex} className="reply-message">
                                            <p>{reply.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="send-message-container">
                <h2> Contact Info </h2>
                <div className="socials-container">
                    <div className="socials-items">
                        <div className="socials-items-img-cont">
                            <img src={emailIcon}/>
                        </div>   
                        <div>
                            <p>abebekebede@gmail.com</p>
                        </div>
                    </div>

                    <div className="socials-items">
                        <div className="socials-items-img-cont">
                            <img src={telegramIcon}/>
                        </div>   
                        <div>
                            <p>@heheh</p>
                        </div>
                    </div>

                    <div className="socials-items">
                        <div className="socials-items-img-cont">
                            <img src={linkedinIcon}/>
                        </div>   
                        <div>
                            <p>linkedin.com</p>
                        </div>
                    </div>                 
                </div>
            </div>
        </div>
    );
}

export default Contact_Tutor;