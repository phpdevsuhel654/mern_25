import API from "../api/axios";

export default function ExpenseTable({ expenses, fetchData }) {
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchData();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e._id} className="border-b">
              <td>{e.title}</td>
              <td>₹{e.amount}</td>
              <td>{e.category}</td>
              <td>
                <button
                  onClick={() => deleteExpense(e._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}