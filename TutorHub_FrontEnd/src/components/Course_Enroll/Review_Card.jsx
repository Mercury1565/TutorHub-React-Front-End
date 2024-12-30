import '../../styles/Course_Enroll/Course_Description_body.css';
import { starIcon, blankStarIcon, quoteIcon } from '../../assets/assets.js';

function Review_Card({review}) {
  const reviewName = review ? review.student.firstName: '';
  const reviewRating = review ? review.rating: 0;
  const reviewText = review ? review.text: '';

  return (
    <div className="review-card">
      <div className="review-card-profile">
        <div className="review-card-profile-info">
          <div>
            <div className="review-card-profile-name">{reviewName}</div>
            <div className="review-card-profile-rating">
              {[...Array(5)].map((_, index) => {
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
