import React, { useState } from "react";

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleUpdate = () => {
    onUpdate(todo._id, { title: newTitle });
    setIsEditing(false);
  };

  return (
    <li className="flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2 shadow-sm">
        {isEditing ? (
            <>
            <input
                className="flex-1 border rounded px-2 py-1 mr-2"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
            <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={handleUpdate}
            >
                Save
            </button>
            </>
        ) : (
            <>
            <span
                onClick={() =>
                onUpdate(todo._id, { completed: !todo.completed })
                }
                className={`flex-1 cursor-pointer ${
                todo.completed ? "line-through text-gray-400" : ""
                }`}
            >
                {todo.title}
            </span>

            <div className="flex gap-2">
                <button
                className="text-yellow-500 hover:text-yellow-600"
                onClick={() => setIsEditing(true)}
                >
                ✏️
                </button>
                <button
                className="text-red-500 hover:text-red-600"
                onClick={() => onDelete(todo._id)}
                >
                🗑️
                </button>
            </div>
            </>
        )}
    </li>
  );
}

export default React.memo(TodoItem);