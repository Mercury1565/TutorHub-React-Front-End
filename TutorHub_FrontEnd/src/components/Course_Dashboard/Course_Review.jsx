import { useState, useEffect } from "react";
import Review_Card from "../Course_Enroll/Review_Card";
import { buttonLeft, buttonRight, rateStar, rateStarFilled} from "../../assets/assets";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Course_Review({programId}){
    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const [hover, setHover] = useState(0);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}course/get_Review/${programId.id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                );
                setReviews(response.data);
            } catch (error) {
                console.error('There was an error fetching reviews!', error);
            }
        };

        fetchRequests();
    }, []);
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const handleLeftClick = () => {
        setCurrentReviewIndex(oldIndex => oldIndex > 0 ? oldIndex - 1 : reviews.length - 1);
    }
    
    const handleRightClick = () => {
        setCurrentReviewIndex(oldIndex => oldIndex < reviews.length - 1 ? oldIndex + 1 : 0);
    }

    const handleSubmitReview = async () => {
        try {
            const response = await axios.post(
                `${baseUrl}course/add_Review`,
                {
                    courseId: programId.id,
                    rating: rating,
                    text: reviewText,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 200) {
                setReviews([...reviews, response.data]);
                setRating(0);
                setReviewText("");
            }
            alert("Review submitted successfully!");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return(
        <div className="course-page-main-content">
            <div className="course-review-container">
                <div className="review-cards-container">
                    <Review_Card review={reviews[currentReviewIndex]} />
                </div>
                <div className='review-nav-buttons'>
                    <img src={buttonLeft} onClick={handleLeftClick} className='review-nav-but'/>
                    <img src={buttonRight} onClick={handleRightClick} className='review-nav-but'/>
                </div>
            </div>

            <div className="submit-review-container">
                <h2> Rate & Review</h2>
                <div className="rate-stars">
                    {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;

                        return (
                            <label key={index}>
                                <input 
                                    type="radio" 
                                    name="rating" 
                                    value={ratingValue} 
                                    onClick={() => setRating(ratingValue)}
                                    className="rating-radio"
                                />
                                <img 
                                    src={ratingValue <= (hover || rating) ? rateStarFilled : rateStar} 
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                    className="review-rate-star"
                                />
                            </label>
                        );
                    })}
                </div>

                <input 
                    type="text" 
                    placeholder="Write a review..."
                    className="review-textfield"
                    onChange={(e) => setReviewText(e.target.value)}
                    />
                <div className="review-but-div">
                    <button className="review-submit-but" onClick={handleSubmitReview}>
                        Submit Review
                    </button>
                </div>
            </div>

        </div>
    );
}

export default Course_Review;