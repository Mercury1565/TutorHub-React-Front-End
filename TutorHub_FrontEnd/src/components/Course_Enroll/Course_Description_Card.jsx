import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/Course_Enroll/Course_Description_Card.css';
import axios from 'axios';
import { buttonLeft, buttonRight } from '../../assets/assets.js';
import Star from '../../assets/star.png';
import OverView_Card from './Overview_Card';
import About_Tutor_Card from './About_Tutor_Card';
import Review_Card from './Review_Card.jsx';
import Payment_Card from './Payment_Card.jsx';
import Details_Card from './Details_Card.jsx';
import Course_Search_Head from '../Search_Courses/Course_Search_Head.jsx';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Course_Description_Card() {
  const location = useLocation();
  const program = location.state?.programId;

  const [activeButton, setActiveButton] = useState('button1');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  (program); 

  useEffect(() => {
    const fetchRequests = async () => {
        try {
            const response = await axios.get(
                `${baseUrl}course/get_Review/${program.programId}`,
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

  const handleClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  const handleLeftClick = () => {
    setCurrentReviewIndex((oldIndex) =>
      oldIndex > 0 ? oldIndex - 1 : reviews.length - 1
    );
  };

  const handleRightClick = () => {
    setCurrentReviewIndex((oldIndex) =>
      oldIndex < reviews.length - 1 ? oldIndex + 1 : 0
    );
  };

  (reviews)


  return (
    <div className="description-page-total">
      <Course_Search_Head />
      <div className="description-page">
        <div className="description-card">
          <div className="description-card-header">
            <img src={program.image} alt="Instructor" />
          </div>

          <div className="description-card-badge">
            <p className="description-category">{program.subject}</p>

            <div className="description-rat">
              <div className="description-starContainer">
                <img src={Star} alt="star" />
                <p>{program.rate} Reviews</p>
              </div>
            </div>
          </div>

          <div className="description-card-body">
            <span className="description-rating"></span>
            <h3 className="description-title">{program.title}</h3>
            <p className="description-instructor">By {program.tutorName}</p>
          </div>

          <div className="description-card-footer">
            <button
              id="button1"
              className={`description-text-button ${
                activeButton === 'button1' ? 'button-active' : ''
              }`}
              onClick={() => handleClick('button1')}
            >
              OverView
            </button>
            <button
              id="button2"
              className={`description-text-button ${
                activeButton === 'button2' ? 'button-active' : ''
              }`}
              onClick={() => handleClick('button2')}
            >
              About Tutor
            </button>
            <button
              id="button3"
              className={`description-text-button ${
                activeButton === 'button3' ? 'button-active' : ''
              }`}
              onClick={() => handleClick('button3')}
            >
              Reviews
            </button>
            <button
              id="button4"
              className={`description-text-button-payment ${
                activeButton === 'button4' ? 'button-active' : ''
              }`}
              onClick={() => handleClick('button4')}
            >
              Make Payment
            </button>
          </div>
          {activeButton === 'button1' && (
            <OverView_Card program={program} />
          )}
          {activeButton === 'button2' && (
            <About_Tutor_Card program={program} />
          )}
          {activeButton === 'button3' && (
            <div className="rating-div">
              <div className="rating-cards-container">
                <Review_Card review={reviews[currentReviewIndex]} />
              </div>
              <div className="rating-nav-buttons">
                <img
                  src={buttonLeft}
                  onClick={handleLeftClick}
                  className="rating-nav-but"
                />
                <img
                  src={buttonRight}
                  onClick={handleRightClick}
                  className="rating-nav-but"
                />
              </div>
            </div>
          )}
          {activeButton === 'button4' && <Payment_Card program={program}/>}
        </div>

        <div className="description-details-container">
          <Details_Card />
        </div>
      </div>
    </div>
  );
}
export default Course_Description_Card;
