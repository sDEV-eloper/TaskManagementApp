import React from "react";
import { CiClock2 } from "react-icons/ci";

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

const TaskCard: React.FC<TaskCardProps> = ({
  _id,
  title,
  description,
  status,
  priority,
  deadline,
  onEdit,
  onDelete,
}) => {
  const priorityClass =
    priority.toLowerCase() === "high"
      ? "bg-orange-500 text-white  rounded-md text-center"
      : priority.toLowerCase() === "medium"
      ? "bg-yellow-500 text-white  rounded-md text-center"
      : "bg-green-500 text-white  rounded-md text-center";

      const [day, month, year] = new Date(deadline).toLocaleDateString('en-GB').split('/'); // 'en-GB' format returns 'dd/mm/yyyy'
      const formattedDate = `${day.padStart(2, '0')}-${month.padStart(2, '0')}-${year}`;
  return (
    <div className="bg-gray-100 border p-4 rounded-lg mb-4">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      <div className="flex justify-center items-start flex-col gap-2">
        <div className="text-sm flex flex-col gap-2 text-gray-500">
          <span className={`${priorityClass} w-fit py-1 px-2 my-2`}>{priority}</span>
          <div className="flex gap-2 justify-center items-center my-2">
            <span><CiClock2 size={25} /> </span>
          <span className="font-semibold">
            {formattedDate}
          </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white py-1 px-3 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white py-1 px-3 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
