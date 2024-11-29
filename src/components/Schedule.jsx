import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Schedule.css';

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state to handle failures

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    1,
    2,
    3,
    4
  ];

  // Simulated fake API URLs
  const scheduleUrl = 'http://localhost:8080/course_schedule'; // Replace with your actual API
  const coursesUrl = 'http://localhost:8080/faculty_course'; // Replace with your actual API

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token);
        const response = await axios.get(scheduleUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setSchedule(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch schedule');
      }
    };

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(coursesUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setCourses(response.data); // Assuming the API returns the course data
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch courses');
      }
    };

    // Fetch data when the component mounts
    fetchSchedule();
    fetchCourses();
  }, []);

  const getScheduleForSlot = (day, time) => {
    const slot = schedule.find(
      (item) => item.day === day && item.time === time
    );
    return slot ? (
      <span>{`Course: ${slot.courseCode}, ${slot.building} ${slot.room}`}</span>
    ) : (
      <span>No Class</span>
    );
  };

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear JWT token, redirect to login page, etc.)
    window.location.href = '/login'; // Example redirect
  };

  return (
    <div className="schedule-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

      <h1 className="schedule-title">Student Schedule</h1>
      
      {loading ? (
        <p>Loading schedule and courses...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="schedule-grid">
            {/* Day Headers */}
            {days.map((day, index) => (
              <div key={index} className="day-header">
                {day}
              </div>
            ))}

            {/* Time Slots */}
            {timeSlots.map((time, rowIndex) =>
              days.map((_, colIndex) => {
                const slot = schedule.find(
                  (item) => item.day === colIndex + 1 && item.time === time
                );
                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`time-slot ${slot ? 'has-class' : 'no-class'}`}
                  >
                    <p className="time-label">{time}</p>
                    <p className="schedule-details">
                      {getScheduleForSlot(colIndex + 1, time)}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Course List */}
          <div className="courses-container">
            <h2 className="courses-title">Course List</h2>
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Faculty Name</th>
                  <th>Course Name</th>
                  <th>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.facultyId}>
                    <td>{course.facultyId}</td>
                    <td>{course.facultyName}</td>
                    <td>{course.courseName}</td>
                    <td>{course.courseCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Schedule;
