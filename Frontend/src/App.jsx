import React, { useState, useEffect } from 'react';
import CourseForm from './CourseForm';
import InstanceForm from './InstanceForm';
import CourseList from './CourseList';
import InstanceList from './InstanceList';

function App() {
  const [courses, setCourses] = useState([]);
  const [refreshCourses, setRefreshCourses] = useState(false);
  const [refreshInstances, setRefreshInstances] = useState(false);

  // Fetch courses from the database when the component mounts or when courses are refreshed
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch('http://localhost:8080/api/courses');
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error('Failed to fetch courses');
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }
    fetchCourses();
  }, [refreshCourses]);

  const handleRefreshCourses = () => {
    setRefreshCourses(!refreshCourses);
  };

  const handleRefreshInstances = () => {
    setRefreshInstances(!refreshInstances);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Create a Course</h2>
          <CourseForm refreshCourses={handleRefreshCourses} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Create a Course Instance</h2>
          <InstanceForm refreshInstances={handleRefreshInstances} courses={courses} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Course List</h2>
          <CourseList refreshTrigger={refreshCourses} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Instance List</h2>
          <InstanceList refreshTrigger={refreshInstances} />
        </div>
      </div>
    </div>
  );
}

export default App;
