import { useCallback, useEffect, useState } from "react";
import {
  getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "./api";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("all"); // FIX

  // Fetch Todos (FIXED)
  const fetchTodos = useCallback(async () => {
	try {
		const res = await getTodos({
		params: {
			page,
			limit: 5,
			search,
		},
		});

		console.log("API Response:", res.data);

		setTodos(res.data.todos || []);
		setTotalPages(res.data.totalPages || 1);
	} catch (err) {
		console.error(err);
	}
  }, [page, search]);

  // useEffect FIX
  useEffect(() => {
	fetchTodos();
  }, [fetchTodos]);

  // Add Todo
  const handleAdd = useCallback(async (title) => {
    await addTodo({ title });
    fetchTodos();
  }, [fetchTodos]);

  // Update Todo
  const handleUpdate = useCallback(async (id, data) => {
    await updateTodo(id, data);
    fetchTodos();
  }, [fetchTodos]);

  // Delete Todo
  const handleDelete = useCallback(async (id) => {
    await deleteTodo(id);
    fetchTodos();
  }, [fetchTodos]);

  // Safe filtering
  const filteredTodos = (todos || []).filter((todo) => {
	//console.log("Filtering todo:", todo, "with filter:", filter); // 🔍 debug
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo App
        </h1>

        <TodoInput onAdd={handleAdd} />

        <Filter setFilter={setFilter} />

        {/* Search */}
        <input
          className="w-full mb-3 border px-3 py-2 rounded-lg"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <TodoList
          todos={filteredTodos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <div>
			<button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Prev
			</button>

			<span> Page {page} of {totalPages} </span>

			<button
				disabled={page === totalPages}
				onClick={() => setPage(page + 1)}
			>
				Next
			</button>
		</div>


      </div>
    </div>
  );
}

export default App;