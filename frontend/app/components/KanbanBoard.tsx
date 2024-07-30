import React, { useState, useEffect } from 'react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';
import { logout } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const KanbanBoard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const email = localStorage.getItem('email');
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<any[]>([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token'); 

    await axios.get('http://localhost:3001/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
    .then(response => {
      console.log(response.data);
      setTasks(response.data);
    })
    .catch(error => {
      console.log("Axios Err: ", error);
    });
  };

  useEffect(() => {
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
    const token = localStorage.getItem('token');
    try {
      if (isEditing) {
        // Update task
        await axios.put(`http://localhost:3001/api/tasks/${currentTask._id}`, task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasks.map(t => (t._id === currentTask._id ? task : t)));
      } else {
        // Add new task
        const response = await axios.post('http://localhost:3001/api/tasks', task, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks([...tasks, response.data]);
      }
      closeModal();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3001/api/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter(t => t._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const groupedTasks = tasks.reduce((acc: any, task: any) => {
    acc[task.status] = [...(acc[task.status] || []), task];
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-white shadow-md p-4 flex flex-col">
        <div className="flex items-center mb-6">
          <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center mr-2">
            <span className="text-gray-600">JG</span>
          </div>
          <div>
            <p className="text-gray-800 font-semibold">{email}</p>
          </div>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">Home</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">Boards</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">Settings</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">Teams</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">Analytics</a>
            </li>
          </ul>
        </nav>
        <button className="mt-auto bg-purple-600 text-white py-2 rounded-lg" onClick={() => openModal()}>Create new task</button>
        <button className="mt-4 bg-gray-200 text-gray-800 py-2 rounded-lg">Download the app</button>
      </aside>

      <main className="flex-grow p-4">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Good morning, Joe!</h1>
          <div className="flex space-x-4">
            <button className="bg-gray-200 p-2 rounded-md">Help & feedback</button>
            <button className="bg-gray-200 rounded-md p-1 text-sm" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <div className="mb-6 flex justify-between">
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 mr-4">
            <h2 className="font-semibold mb-2">Introducing tags</h2>
            <p className="text-sm">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-1 mr-4">
            <h2 className="font-semibold mb-2">Share Notes Instantly</h2>
            <p className="text-sm">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex-1">
            <h2 className="font-semibold mb-2">Access Anywhere</h2>
            <p className="text-sm">Sync your notes across all devices, stay productive whether you&apos;re on your phone, tablet, or computer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['todo', 'inProgress', 'underReview', 'finished'].map(status => (
            <div key={status} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="font-semibold text-xl mb-4 capitalize">{status.replace(/([A-Z])/g, ' $1')}</h2>
              {groupedTasks[status]?.map((task: any) => (
                <TaskCard key={task._id} {...task} onEdit={() => openModal(task)} onDelete={() => handleTaskDelete(task._id)} />
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
      </main>

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
