import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4">
      {notes.map((note) => (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
          <h3 className="font-bold text-lg">{note.title}</h3>
          <p className="text-gray-600">{note.content}</p>

          <div className="flex gap-2 mt-2">
            <button onClick={() => onEdit(note)}>
              <FaEdit />
            </button>
            <button onClick={() => onDelete(note._id)}>
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;