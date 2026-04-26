import React from "react";

const Pagination = ({ page, setPage, total }) => {
  const totalPages = Math.ceil(total / 5);

  return (
    <div className="flex justify-center mt-4 gap-2">
      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 border ${
            page === i + 1 ? "bg-blue-500 text-white" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;