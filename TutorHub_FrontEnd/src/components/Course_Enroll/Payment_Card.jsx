import { useState } from "react";
import axios from "axios";
import { telebirr,cbe,mpesa,awash,payment,upload } from "../../assets/assets";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Payment_Card({program}){
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
        formData.append('receiptFile', uploadedFile);
        formData.append('courseId', program.programId)
    
        try {
            const response = await axios.post(`${baseUrl}course/handle_payment`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            alert('Payment successful!');
        } 
        
        catch (error) {
            alert(`Payment failed. ${error.response.data.message}`);
        }
    }

    return (
        <div className="payment-container">
            <h2>We Accept</h2>
            <div className="payment-methods">
                {program.paymentMethods.map((method, index) => (
                    <div key={index} className="payment-method">
                        <div className="payment-img-container">
                            <img src={
                                method.method === 'telebirr' ? telebirr : 
                                method.method === 'cbe' ? cbe : 
                                method.method === 'awash' ? awash : 
                                method.method === 'mpesa' ? mpesa : ''

                                } alt={`${method.method} Logo`} />
                        </div>
                        <div className="payment-account-container">
                            <div className="payment-logo-container">
                                <img src={payment} alt="Payment Method Logo" />
                            </div>
                            <p>{method.number}</p>
                        </div>
                    </div>
                ))}
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