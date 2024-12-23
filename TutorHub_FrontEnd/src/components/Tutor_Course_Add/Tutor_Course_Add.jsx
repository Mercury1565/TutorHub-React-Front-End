import { useState } from 'react'
import '../../styles/Tutor_Course_Add/Tutor_Course_Add.css'
import { upload } from '../../assets/assets'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Tutor_Course_Add() {
    const navigate_to = useNavigate();
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [grade, setGrade] = useState('')
    const [fee, setFee] = useState('')
    const [durationPerDay, setDurationPerDay] = useState('')
    const [seatsRemaining, setSeatsRemaining] = useState('')
    const [paymentMethods, setPaymentMethods] = useState([])

    const handleAddProgram = async (event) => {
        event.preventDefault()

        try {
            const response = await axios.post(
                'http://localhost:3000/course/',
                {
                    title,
                    subject,
                    description,
                    grade,
                    image,  
                    fee,
                    durationPerDay,
                    seatsRemaining,
                    paymentMethods,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            )

            setTitle('')
            setGrade('')
            setSubject('')
            setFee('')
            setImage('')
            setDescription('')
            setDurationPerDay('')
            setSeatsRemaining('')
        } catch (error) {
            console.error(error, error.message)
        }
        navigate_to('/tutor');
    }

    return (
        <div className="add-container">
            <div className="add-program-container">
                <h2>Add a Program</h2>
                <form onSubmit={handleAddProgram}>
                    <div>
                        <div className="program-add-input">
                            <p>Program Title</p>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="program-add-input">
                            <p>Grade Level</p>
                            <select
                                className="add-grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                placeholder="Grade Level"
                            >
                                {Array.from(
                                    { length: 12 },
                                    (_, i) => i + 1
                                ).map((grade) => (
                                    <option key={grade} value={grade}>
                                        {grade}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className="program-add-input">
                            <p>Subject</p>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Subject"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="program-add-input">
                            <p>Monthly Fee</p>
                            <input
                                type="text"
                                value={fee}
                                onChange={(e) => setFee(e.target.value)}
                                placeholder="Monthly Fee"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="program-add-input">
                            <p>Program Image URL</p>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Image URL"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="program-add-input">
                            <p>Description</p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="program-add-input">
                            <p>Hours per Day</p>
                            <input
                                type="text"
                                value={durationPerDay}
                                onChange={(e) => setDurationPerDay(e.target.value)}
                                placeholder="Hours per Day"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="program-add-input">
                            <p>Number of Seats</p>
                            <input
                                type="text"
                                value={seatsRemaining}
                                onChange={(e) => setSeatsRemaining(e.target.value)}
                                placeholder="Number of Seats"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="program-add-input">
                            <p>Payment Methods</p>
                            {['telebirr', 'safaricom', 'cbe', 'awash'].map((method) => (
                                <div key={method}>
                                    <label htmlFor={method}>{method}</label>
                                    <input
                                        type="text"
                                        placeholder={`${method} account number`}
                                        onChange={(e) => {
                                            const newPaymentMethods = paymentMethods.map((paymentMethod) => 
                                                paymentMethod.method === method 
                                                    ? { ...paymentMethod, number: e.target.value } 
                                                    : paymentMethod
                                            );
                                            if (!newPaymentMethods.some(paymentMethod => paymentMethod.method === method)) {
                                                newPaymentMethods.push({ method: method, number: e.target.value });
                                            }
                                            setPaymentMethods(newPaymentMethods);
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button type="submit" onClick={handleAddProgram}>
                        Add Program
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Tutor_Course_Add
