import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

const KanbanBoard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const tasks = {
    todo: [
      {
        title: 'Implement User Authentication',
        priority: 'Urgent',
        dueDate: '2024-08-15',
        createdDate: '2024-07-29',
        timeAgo: '1 hr ago',
      },
    ],
    inProgress: [
      {
        title: 'Design Home Page UI',
        priority: 'Medium',
        dueDate: '2024-08-15',
        createdDate: '2024-07-29',
        timeAgo: '1 hr ago',
      },
      {
        title: 'Conduct User Feedback Survey',
        priority: 'Low',
        dueDate: '2024-08-05',
        createdDate: '2024-07-29',
        timeAgo: '3 hr ago',
      },
    ],
    underReview: [
      {
        title: 'Integrate Cloud Storage',
        priority: 'Urgent',
        dueDate: '2024-08-20',
        createdDate: '2024-07-27',
        timeAgo: '2 days ago',
      },
    ],
    finished: [
      {
        title: 'Test Cross-browser Compatibility',
        priority: 'Medium',
        dueDate: '2024-07-30',
        createdDate: '2024-07-25',
        timeAgo: '4 days ago',
      },
    ],
  };

  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl w-full">
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold text-xl mb-4">To do</h2>
          {tasks.todo.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
          <button
            onClick={openModal}
            className="bg-black text-white rounded-lg w-full py-2 mt-4"
          >
            Add new
          </button>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold text-xl mb-4">In progress</h2>
          {tasks.inProgress.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
          <button
            onClick={openModal}
            className="bg-black text-white rounded-lg w-full py-2 mt-4"
          >
            Add new
          </button>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold text-xl mb-4">Under review</h2>
          {tasks.underReview.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
          <button
            onClick={openModal}
            className="bg-black text-white rounded-lg w-full py-2 mt-4"
          >
            Add new
          </button>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg">
          <h2 className="font-semibold text-xl mb-4">Finished</h2>
          {tasks.finished.map((task, index) => (
            <TaskCard key={index} {...task} />
          ))}
          <button
            onClick={openModal}
            className="bg-black text-white rounded-lg w-full py-2 mt-4"
          >
            Add new
          </button>
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default KanbanBoard;
