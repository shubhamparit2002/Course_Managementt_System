import React from 'react';

function InstanceDetail({ instance }) {
    if (!instance) {
        return <div className="text-center py-6 text-gray-600">No instance details available.</div>;
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Instance Details</h2>
            <p className="text-lg font-semibold mb-2">Course: <span className="font-normal">{instance.course.title}</span></p>
            <p className="text-lg font-semibold mb-2">Course Code: <span className="font-normal">{instance.course.code}</span></p>
            <p className="text-lg font-semibold mb-2">Year: <span className="font-normal">{instance.year}</span></p>
            <p className="text-lg font-semibold">Semester: <span className="font-normal">{instance.semester}</span></p>
        </div>
    );
}

export default InstanceDetail;
