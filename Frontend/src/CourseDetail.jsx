import React, { useEffect, useState } from 'react';

function CourseDetail({ id }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCourse() {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8080/api/courses/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourse(data);
                } else {
                    console.error('Failed to fetch course');
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center py-6 text-gray-600">
                <p>Loading course details...</p>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="text-center py-6 text-gray-600">
                <p>No course details available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Course Details</h2>
            <p className="text-lg font-semibold mb-2">Title: <span className="font-normal">{course.title}</span></p>
            <p className="text-lg font-semibold mb-2">Code: <span className="font-normal">{course.code}</span></p>
            <p className="text-lg font-semibold">Description: <span className="font-normal">{course.description}</span></p>
        </div>
    );
}

export default CourseDetail;
