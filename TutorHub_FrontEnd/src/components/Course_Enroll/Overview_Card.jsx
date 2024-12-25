import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BASE_URL;

function OverView_Card() {
  const location = useLocation();
  const programId = location.state?.programId;

  const [courseOverview, setCourseOverview] = useState(
    'Sample Course Overview'
  );

  useEffect(() => {
    const fetchCourseOverView = async () => {
      try {
        const response = await axios.get(`${baseUrl}course/${programId.programId}`);
        setCourseOverview(response.data.description);
      } catch (error) {
        console.error('Failed to fetch course overview:', error);
      }
    };

    fetchCourseOverView();
  }, [programId]);

  return (
    <div className="course-overview-card">
      <h2>Tutorial Overview</h2>
      <p>{courseOverview}</p>
    </div>
  );
}

export default OverView_Card;
