import { Request, Response } from 'express';
import Task from '../models/Task';

const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, deadline } = req.body;
  try {
    const newTask = new Task({
      user: req.userId,
      title,
      description,
      status,
      priority,
      deadline,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority, deadline } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status, priority, deadline },
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export { getTasks, createTask, updateTask, deleteTask };
