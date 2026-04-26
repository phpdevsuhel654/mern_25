import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getNotes = (params) => API.get("/notes", { params });
export const createNote = (data) => API.post("/notes", data);
export const updateNote = (id, data) => API.put(`/notes/${id}`, data);
export const deleteNote = (id) => API.delete(`/notes/${id}`);