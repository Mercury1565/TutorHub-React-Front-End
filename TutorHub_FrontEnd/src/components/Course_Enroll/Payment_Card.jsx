import { useState } from "react";
import { telebirr,cbe,mpesa,awash,payment,upload } from "../../assets/assets";

function Payment_Card(){
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFileUpload = (event) => {
        setUploadedFile(event.target.files[0]);
    }

    const handlePayment = async () => {
        if (!uploadedFile) {
            alert('Please upload a file before making a payment.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', uploadedFile);
    
        try {
            const response = await fetch('API ENDPOINT FOR FILE UPLOAD', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response error');
            }
    
            const data = await response.json();
            console.log(data);
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