import { useState, useEffect } from "react";
import { buttonLeft, buttonRight, rateStar, rateStarFilled} from "../../assets/assets";
import axios from "axios";
import Review_Card from "../Course_Enroll/Review_Card";

const baseUrl = import.meta.env.VITE_BASE_URL;

function Course_Review({programId}){
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `${baseUrl}course/get_Review/${programId}`,
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
        </div>

    );
}

export default Course_Review;