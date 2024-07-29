import React from 'react';

interface TaskCardProps {
  title: string;
  priority: 'Low' | 'Medium' | 'Urgent';
  dueDate: string;
  createdDate: string;
  timeAgo: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, priority, dueDate, createdDate, timeAgo }) => {
  const priorityColors = {
    Low: 'bg-green-100 text-green-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Urgent: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColors[priority]}`}>
        {priority}
      </span>
      <div className="text-sm text-gray-600 mt-2">
        <p>
          <i className="far fa-calendar-alt"></i> {dueDate}
        </p>
        <p className="mt-1">
          <i className="far fa-clock"></i> {timeAgo}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
