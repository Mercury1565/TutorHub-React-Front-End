import { useState } from "react";
import axios from "axios";
import { telebirr,cbe,mpesa,awash,payment,upload } from "../../assets/assets";
import { useLocation } from "react-router-dom";

function Payment_Card(){
    const [uploadedFile, setUploadedFile] = useState(null);

    const location = useLocation();
    const programId = location.state?.programId;
    const baseUrl = 'http://localhost:3000/course/handle_payment';


    const handleFileUpload = (event) => {
        setUploadedFile(event.target.files[0]);
    }

    const handlePayment = async () => {
        if (!uploadedFile) {
            alert('Please upload a file before making a payment.');
            return;
        }
    
        const formData = new FormData();
        formData.append('receiptFile', uploadedFile);
        formData.append('courseId', programId.programId)
    
        try {
            const response = await axios.post(baseUrl, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data);
        } 
        
        catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="payment-container">
            <h2>We Accept</h2>
            <div className="payment-methods">
                <div className="payment-row">
                    <div className="payment-method">
                        <div className="payment-img-container">
                            <img src={telebirr} alt="Payment Method Logo" />
                        </div>
                        <div className="payment-account-container">
                            <div className="payment-logo-container">
                                <img src={payment} alt="Payment Method Logo" />
                            </div>
                            <p>+2519000000</p>
                        </div>
                    </div>

                    <div className="payment-method">
                        <div className="payment-img-container">
                            <img src={mpesa} alt="Payment Method Logo" />
                        </div>
                        <div className="payment-account-container">
                            <div className="payment-logo-container">
                                <img src={payment} alt="Payment Method Logo" />
                            </div>
                            <p>+2519000000</p>
                        </div>
                    </div>
                </div>

                <div className="payment-row">
                    <div className="payment-method">
                        <div className="payment-img-container">
                            <img src={awash} alt="Payment Method Logo" />
                        </div>
                        <div className="payment-account-container">
                            <div className="payment-logo-container">
                                <img src={payment} alt="Payment Method Logo" />
                            </div>
                            <p>1000028282828</p>
                        </div>
                    </div>

                    <div className="payment-method">
                        <div className="payment-img-container">
                            <img src={cbe} alt="Payment Method Logo" />
                        </div>
                        <div className="payment-account-container">
                            <div className="payment-logo-container">
                                <img src={payment} alt="Payment Method Logo" />
                            </div>
                            <p>10000010101010</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="upload-receipt">
                <p>Upload Receipt</p>
                <div className="upload-box">
                    <input type="file" onChange={handleFileUpload}/>
                    <div className="upload-img">
                        <img src={upload}/>
                        <p>Click or Drop File</p>
                    </div>
                </div>
            </div>

            <button onClick={handlePayment} className="payment-button">Make Payment</button>
        </div>
    );

}

export default Payment_Card;