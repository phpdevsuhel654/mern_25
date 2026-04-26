import React, { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/noteApi";
import NoteForm from "../components/NoteForm";
import NoteList from "../components/NoteList";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import { toast } from "react-toastify";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sort, setSort] = useState("-createdAt");
  const [selectedNote, setSelectedNote] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchNotes = async () => {
	setLoading(true);
    const { data } = await getNotes({ keyword, page, sort });
	setLoading(false);
    setNotes(data.notes);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchNotes();
  }, [keyword, page]);

  const handleCreate = async (note) => {
    if (selectedNote) {
      await updateNote(selectedNote._id, note);
      toast.success("Note updated");
    } else {
      await createNote(note);
      toast.success("Note created");
    }
    setSelectedNote(null);
    fetchNotes();
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    //await deleteNote(id);
    //toast.success("Deleted");
	await deleteNote(deleteId);
	setShowModal(false);
    fetchNotes();
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>

      <SearchBar keyword={keyword} setKeyword={setKeyword} />

	  <select
		value={sort}
		onChange={(e) => setSort(e.target.value)}
		className="p-2 border rounded-lg"
		>
		<option value="-createdAt">Newest</option>
		<option value="createdAt">Oldest</option>
		<option value="title">Title A-Z</option>
	  </select>

      <NoteForm onSubmit={handleCreate} selectedNote={selectedNote} />

      <NoteList
        notes={notes}
        onEdit={setSelectedNote}
        onDelete={handleDelete}
      />

      <Pagination page={page} setPage={setPage} total={total} />
    </div>
  );
};

export default Home;