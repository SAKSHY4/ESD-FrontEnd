import { useState, useEffect } from 'react';
import { fetchAvailableCourses, enrollCourses } from '../services/courseService';
import { useNavigate } from 'react-router-dom';

export const useCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      const token = localStorage.getItem('token');

      try {
        const data = await fetchSchedule(token);
        setCourses(data);
      } catch (error) {
        console.error('Error fetching Schedule:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  
  return {
    courses,
    selectedCourses,
    loading,
    handleCheckboxChange,
    handleSubmit,
    handleLogout,
    isSubmitEnabled,
  };
};
