import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import Card from "../components/ui/Card";
import Charts from "../components/Charts";
import ExpenseTable from "../components/ExpenseTable";
import Filters from "../components/Filters";
import API from "../api/axios";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchData = async () => {
    const { data } = await API.get("/expenses", { params: filters });
    setExpenses(data.expenses);

    const cat = await API.get("/expenses/reports/category");
    const mon = await API.get("/expenses/reports/monthly");

    setCategoryData(cat.data);
    setMonthlyData(mon.data);
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const total = expenses.reduce((acc, e) => acc + e.amount, 0);

  return (
    <Layout>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card title="Total" value={`₹${total}`} />
        <Card title="Transactions" value={expenses.length} />
        <Card title="Top Category" value={categoryData[0]?._id || "-"} />
      </div>

      <Filters setFilters={setFilters} />

      <Charts categoryData={categoryData} monthlyData={monthlyData} />

      <div className="mt-6">
        <ExpenseTable expenses={expenses} fetchData={fetchData} />
      </div>
    </Layout>
  );
}