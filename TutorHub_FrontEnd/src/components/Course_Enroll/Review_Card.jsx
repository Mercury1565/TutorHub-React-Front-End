import '../../styles/Course_Enroll/Course_Description_body.css';
import { starIcon, blankStarIcon, quoteIcon } from '../../assets/assets.js';
import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Review_Card = () => {
  const [reviewName, setReviewName] = useState('Sample Reviewer');
  const [reviewRating, setReviewRating] = useState(2);
  const [reviewText, setReviewText] = useState('This is a sample review ');

  return (
    <div className="review-card">
      <div className="review-card-profile">
        <div className="review-card-profile-info">
          <div>
            <div className="review-card-profile-name">{reviewName}</div>
            <div className="review-card-profile-rating">
              {[...Array(5)].map((star, index) => {
                return (
                  <img
                    key={index}
                    src={index < reviewRating ? starIcon : blankStarIcon}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <img src={quoteIcon} />
          </div>
        </div>
      </div>
      <div className="review-card-quote">
        <p>"{reviewText}"</p>
      </div>
    </div>
  );
};

export default Review_Card;
