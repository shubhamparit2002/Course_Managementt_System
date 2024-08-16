import React, { useEffect, useState } from 'react';
import CourseDetail from './CourseDetail';

function CourseList({ refreshTrigger }) {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        async function fetchCourses() {
            const response = await fetch('http://localhost:8080/api/courses');
            const data = await response.json();
            setCourses(data);
        }
        fetchCourses();
    }, [refreshTrigger]);

    const handleView = (id) => {
        setSelectedCourse(id);
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8080/api/courses/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            setCourses(courses.filter(course => course.id !== id));
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Course Title</th>
                        <th className="py-3 px-6 text-left">Code</th>
                        <th className="py-3 px-6 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {courses.map(course => (
                        <tr key={course.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left whitespace-nowrap">{course.title}</td>
                            <td className="py-3 px-6 text-left">{course.code}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    onClick={() => handleView(course.id)}
                                    className="text-blue-500 hover:text-blue-700 font-bold mr-2"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleDelete(course.id)}
                                    className="text-red-500 hover:text-red-700 font-bold"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedCourse && <CourseDetail id={selectedCourse} />}
        </div>
    );
}

export default CourseList;
