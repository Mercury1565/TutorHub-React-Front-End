import { useState } from 'react';
// import axios from 'axios';

import { linkedinIcon, emailIcon, telegramIcon } from "../../assets/assets";

function Contact_Tutor(){
    const [message, setMessage] = useState('');

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('API', { message });
            console.log(response.data);
        } catch (error) {
            console.error(error);
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