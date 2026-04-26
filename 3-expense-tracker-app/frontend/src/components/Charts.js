import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function Charts({ categoryData, monthlyData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Pie
        data={{
          labels: categoryData.map(d => d._id),
          datasets: [{ data: categoryData.map(d => d.total) }],
        }}
      />

      <Bar
        data={{
          labels: monthlyData.map(d => `Month ${d._id}`),
          datasets: [{ data: monthlyData.map(d => d.total) }],
        }}
      />
    </div>
  );
}