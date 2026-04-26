import API from "../api/axios";

export default function ExpenseList({ expenses, fetchData }) {
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchData();
  };

  return (
    <div>
      {expenses.map((e) => (
        <div key={e._id} className="flex justify-between p-2 border mb-2">
          <span>{e.title} - ₹{e.amount}</span>
          <button onClick={() => deleteExpense(e._id)} className="text-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}