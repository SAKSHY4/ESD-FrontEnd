const BASE_URL = 'http://localhost:8080/student_course';

// Fetch available courses for a student
export const fetchSchedule = async (rollno, term, token) => {
  const url = `${BASE_URL}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch Schedule');
  }
  return await response.json();
};