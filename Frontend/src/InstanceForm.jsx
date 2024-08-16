import React, { useState } from 'react';

function InstanceForm({ refreshInstances, courses }) {
    const [courseId, setCourseId] = useState('');
    const [year, setYear] = useState('');
    const [semester, setSemester] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/instances', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                year: year,
                semester: semester,
                course: {
                    id: courseId  // Assuming the server expects an object with an id
                }
            }),
        });

        if (response.ok) {
            refreshInstances();
            setCourseId('');
            setYear('');
            setSemester('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="border p-2"
            >
                <option value="">Select course</option>
                {courses.map((course) => (
                    <option key={course.id} value={course.id}>{course.title}</option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border p-2"
            />
            <input
                type="text"
                placeholder="Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="border p-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add instance</button>
        </form>
    );
}

export default InstanceForm;
