import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import axios from 'axios';

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<any>({ todo: [], inProgress: [], underReview: [], finished: [] });
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks/');
        const fetchedTasks = response.data;
        console.log({fetchedTasks})
     
        const groupedTasks = fetchedTasks.reduce((acc: any, task: any) => {
          acc[task.status] = [...(acc[task.status] || []), task];
          return acc;
        }, {});
        setTasks(groupedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const openModal = (task?: any) => {
    setCurrentTask(task || null);
    setIsEditing(!!task);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentTask(null);
    setIsEditing(false);
  };

  const handleTaskUpdate = async (task: any) => {
    try {
      if (isEditing && currentTask) {
        await axios.put(`http://localhost:3001/api/tasks/${currentTask._id}`, task);
      } else {
        await axios.post('http://localhost:3001/api/tasks/', task);
      }
      closeModal();
      // Refresh tasks
      const response = await axios.get('http://localhost:3001/api/tasks/');
      const fetchedTasks = response.data;
      const groupedTasks = fetchedTasks.reduce((acc: any, task: any) => {
        acc[task.status] = [...(acc[task.status] || []), task];
        return acc;
      }, {});
      setTasks(groupedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl w-full">
        {['todo', 'inProgress', 'underReview', 'finished'].map(status => (
          <div key={status} className="bg-gray-200 p-4 rounded-lg">
            <h2 className="font-semibold text-xl mb-4 capitalize">{status.replace(/([A-Z])/g, ' $1')}</h2>
            {tasks[status]?.map((task: any) => (
              <TaskCard key={task._id} {...task} onEdit={() => openModal(task)} />
            ))}
            <button
              onClick={() => openModal()}
              className="bg-black text-white rounded-lg w-full py-2 mt-4"
            >
              Add new
            </button>
          </div>
        ))}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleTaskUpdate}
        task={currentTask}
        isEditing={isEditing}
      />
    </div>
  );
};

export default KanbanBoard;
