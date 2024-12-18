import React, { useState, useEffect } from 'react';

import axios from 'axios';

import '../../styles/Search_Courses/Course_Search_Main.css';

import Course_Card from './Course_Card';
import Filter_Component from './Filter_Component';
import Course_Search_Head from './Course_Search_Head';
import Search_Bar from './Search_Bar';

const baseUrl = 'http://localhost:3000/course/filter?';

function Course_Search_Main() {
  const [selectedPrograms, setSelectedPrograms] = useState([1, 3, 4, 5, 6, 7]);

  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [selectedRatingChange, setSelectedRatingChange] = useState();
  const [durationPerDayChange, setDurationPerDayChange] = useState();
  const [gradeLevelChange, setGradeLevelChange] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');

  const fetchCourses = async () => {
    try {
      let url = baseUrl;
      if (searchTitle != '') {
        url = baseUrl + `title=${searchTitle}`;
      }

      if (gradeLevelChange != 1) {
        url += `&grade=${gradeLevelChange}`;
      }

      if (durationPerDayChange) {
        url += `&durationPerDay=${durationPerDayChange}`;
      }

      if (selectedRatingChange) {
        url += `&rate=${selectedRatingChange}`;
      }

      const response = await axios.get(url, {});

      console.log(response.data);

      const mappedData = response.data.map((course) => ({
        programId: course._id,
        subject: course.subject,
        title: course.title,
        review: course.rate,
        tutorName: course.tutorName,
        price: course.fee,
        evaluation: course.evaluation,
        seats: course.seatsRemaining,
        resource: course.resource,
        durationPerDay: course.durationPerDay,
        grade: course.grade,
        enrolled: course.enrolledStudents,
        tutorId: course.tutorId,
        image: course.image,
      }));

      setSearchResults(mappedData);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [
    searchTitle,
    gradeLevelChange,
    durationPerDayChange,
    selectedRatingChange,
  ]);

  return (
    <>
      <div className="total-container">
        <Course_Search_Head />

        <div className="course-search-body">
          <div className="filter-card">
            <Filter_Component
              setSelectedRatingChange={setSelectedRatingChange}
              setDurationPerDayChange={setDurationPerDayChange}
              setGradeLevelChange={setGradeLevelChange}
            />
          </div>

          <div className="search-section">
            <Search_Bar setSearchTitle={setSearchTitle} />

            <div className="program-list">
              {searchResults.map((course, index) => (
                <div className="course-card" key={index}>
                  <Course_Card programId={course} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Course_Search_Main;
