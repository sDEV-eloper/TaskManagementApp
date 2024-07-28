import mongoose, { Document, Schema } from 'mongoose';

interface ITask extends Document {
  user: mongoose.Schema.Types.ObjectId;
  title: string;
  description?: string;
  status: 'To-Do' | 'In Progress' | 'Under Review' | 'Completed';
  priority?: 'Low' | 'Medium' | 'Urgent';
  deadline?: Date;
}

const taskSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  priority: { type: String },
  deadline: { type: Date },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
