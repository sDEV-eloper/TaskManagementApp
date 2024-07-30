import React from 'react';

interface TaskCardProps {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  deadline: string;
  onEdit: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ _id, title, description, status, priority, deadline, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-2">{description}</p>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <p>Status: <span className="font-semibold">{status}</span></p>
          <p>Priority: <span className="font-semibold">{priority}</span></p>
          <p>Deadline: <span className="font-semibold">{new Date(deadline).toLocaleDateString()}</span></p>
        </div>
        <div className="flex space-x-2">
          <button onClick={onEdit} className="bg-blue-500 text-white py-1 px-3 rounded-lg">Edit</button>
          <button onClick={onDelete} className="bg-red-500 text-white py-1 px-3 rounded-lg">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
