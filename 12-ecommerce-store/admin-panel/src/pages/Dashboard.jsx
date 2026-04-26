import { useEffect, useState } from 'react';
import API from '../api/axios';
import RevenueChart from '../components/RevenueChart';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    API.get('/admin/analytics/dashboard').then((res) => {
      setStats(res.data);
    });

    API.get('/admin/analytics/revenue').then((res) => {
      setChartData(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl shadow">
          Users: {stats.totalUsers}
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          Products: {stats.totalProducts}
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          Orders: {stats.totalOrders}
        </div>
        <div className="bg-white p-5 rounded-xl shadow">
          Revenue: ₹{stats.totalRevenue}
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={chartData} />
    </div>
  );
};

export default Dashboard;