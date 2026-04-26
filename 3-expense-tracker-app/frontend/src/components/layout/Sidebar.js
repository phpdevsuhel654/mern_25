import { FaChartBar, FaWallet } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-lg p-4">
      <h2 className="text-xl font-bold mb-6">💰 ExpenseTracker</h2>

      <nav className="space-y-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaChartBar /> Dashboard
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaWallet /> Expenses
        </div>
      </nav>
    </div>
  );
}