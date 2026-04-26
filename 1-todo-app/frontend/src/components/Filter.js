import React from "react";

function Filter({ setFilter }) {
  return (
    <div className="flex justify-center gap-2 mb-4">
        {["all", "completed", "pending"].map((type) => (
            <button
            key={type}
            onClick={() => setFilter(type)}
            className="px-3 py-1 rounded-full bg-gray-200 hover:bg-blue-400 hover:text-white capitalize"
            >
            {type}
            </button>
        ))}
    </div>
  );
}

export default Filter;