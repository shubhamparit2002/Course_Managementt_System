import React, { useState } from 'react';

function CourseForm({ refreshCourses }) {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [courseDescription, setCourseDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(' http://localhost:8080/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: courseTitle,
                code: courseCode,
                description: courseDescription,
            }),
        });
        if (response.ok) {
            refreshCourses();
            setCourseTitle('');
            setCourseCode('');
            setCourseDescription('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Course title"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="border p-2"
            />
            <input
                type="text"
                placeholder="Course code"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="border p-2"
            />
            <textarea
                placeholder="Course description"
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add course</button>
        </form>
    );
}

export default CourseForm;
