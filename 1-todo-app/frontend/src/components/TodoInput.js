import React, { useState } from "react";

function TodoInput({ onAdd }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-4">
        <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            placeholder="Add a new task..."
            onChange={(e) => setTitle(e.target.value)}
        />
        <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={handleAdd}
        >
            Add
        </button>
    </div>
  );
}

export default TodoInput;