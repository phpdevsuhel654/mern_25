import { useState } from "react";
import API from "../api/axios";

export default function ExpenseForm({ fetchData }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/expenses", form);
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input type="number" placeholder="Amount" onChange={(e) => setForm({ ...form, amount: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, category: e.target.value })}>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
      </select>
      <button className="bg-green-500 text-white px-4">Add</button>
    </form>
  );
}