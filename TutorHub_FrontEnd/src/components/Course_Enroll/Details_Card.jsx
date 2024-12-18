import { useState } from 'react';

import {
  twitterIcon,
  whatsappIcon,
  IGIcon,
  youtubeIcon,
  facebookIcon,
  enrolledIcon,
  evaluationIcon,
  gradeIcon,
  seatsIcon,
  timeIcon,
} from '../../assets/assets';
import '../../styles/Course_Enroll/Details_Card.css';
import { useLocation } from 'react-router-dom';

function Details_Card() {
  const location = useLocation();
  const programId = location.state?.programId;

  return (
    <div className="program-details-card">
      <div className="monthly-fee">
        <h4>Monthly Fee:</h4>
        <h2>{programId.price} Birr</h2>
      </div>

      <div className="program-details">
        <h3>Program Details:</h3>
        <div className="detail-item">
          <div className="details-icon-container">
            <img className="icon" src={gradeIcon} />
          </div>
          <div className="details-text-container">
            <p className="detailP">Grade</p>
            <p className="detailP2">{programId.grade}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="details-icon-container">
            <img className="icon" src={timeIcon} />
          </div>
          <div className="details-text-container">
            <p className="detailP">Duration per Day</p>
            <p className="detailP2">{programId.durationPerDay}</p>
          </div>
        </div>

        <div className="detail-item">
          <div className="details-icon-container">
            <img className="icon" src={evaluationIcon} />
          </div>
          <div className="details-text-container">
            <p className="detailP">Evaluations</p>
            <p className="detailP2">
              {programId && programId.evaluation ? programId.evaluation : 'No'}
            </p>
          </div>
        </div>
        <div className="detail-item">
          <div className="details-icon-container">
            <img className="icon" src={enrolledIcon} />
          </div>
          <div className="details-text-container">
            <p className="detailP">Enrolled</p>
            <p className="detailP2">{programId.enrolled.length}</p>
          </div>
        </div>
        <div className="detail-item">
          <div className="details-icon-container">
            <img className="icon" src={seatsIcon} />
          </div>
          <div className="details-text-container">
            <p className="detailP">Seats Remaining</p>
            <p className="detailP2">{programId.seats}</p>
          </div>
        </div>
      </div>

      <div className="share-section">
        <a href="#">
          <img src={facebookIcon} alt="Facebook" className="details-icon" />
        </a>
        <a href="#">
          <img src={twitterIcon} alt="Twitter" className="details-icon" />
        </a>
        <a href="#">
          <img src={whatsappIcon} alt="WhatsApp" className="details-icon" />
        </a>
        <a href="#">
          <img src={IGIcon} alt="LinkedIn" className="details-icon" />
        </a>
        <a href="#">
          <img src={youtubeIcon} alt="YouTube" className="details-icon" />
        </a>
      </div>
    </div>
  );
}

export default Details_Card;
