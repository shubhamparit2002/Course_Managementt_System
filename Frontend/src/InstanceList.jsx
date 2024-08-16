import React, { useEffect, useState } from 'react';
import InstanceDetail from './InstanceDetail';

function InstanceList() {
    const [instances, setInstances] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState(null);

    useEffect(() => {
        fetchInstances();
    }, []); // Empty dependency array

    const fetchInstances = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/instances/all');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setInstances(data);
        } catch (error) {
            console.error('Failed to fetch instances:', error);
        }
    };

    const handleDelete = async (id, year, semester) => {
        try {
            const response = await fetch(`http://localhost:8080/api/instances/${year}/${semester}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setInstances(instances.filter(instance => instance.id !== id));
                setSelectedInstance(null)
            } else {
                console.error('Failed to delete instance');
            }
        } catch (error) {
            console.error('Error during delete operation:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-6 text-left">Course Title</th>
                            <th className="py-3 px-6 text-left">Year-Sem</th>
                            <th className="py-3 px-6 text-left">Code</th>
                            <th className="py-3 px-6 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {instances.map(instance => (
                            <tr key={instance.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{instance.course.title}</td>
                                <td className="py-3 px-6 text-left">{instance.year}-{instance.semester}</td>
                                <td className="py-3 px-6 text-left">{instance.course.code}</td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => setSelectedInstance(instance)}
                                        className="text-blue-500 hover:text-blue-700 font-bold mr-2"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleDelete(instance.id, instance.year, instance.semester)}
                                        className="text-red-500 hover:text-red-700 font-bold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedInstance && <InstanceDetail instance={selectedInstance} />}
        </div>
    );
}

export default InstanceList;
