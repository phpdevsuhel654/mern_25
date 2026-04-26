import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const getTodos = (params) => axios.get(API_URL, params);
export const addTodo = (data) => axios.post(API_URL, data);
export const updateTodo = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);
export const deleteTodo = (id) =>
  axios.delete(`${API_URL}/${id}`);