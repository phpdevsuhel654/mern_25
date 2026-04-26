export default function Filters({ setFilters }) {
  return (
    <div className="flex gap-2 mb-4">
      <select onChange={(e) => setFilters(f => ({ ...f, category: e.target.value }))}>
        <option value="">All</option>
        <option>Food</option>
        <option>Travel</option>
      </select>

      <input
        type="date"
        onChange={(e) => setFilters(f => ({ ...f, startDate: e.target.value }))}
      />

      <input
        type="date"
        onChange={(e) => setFilters(f => ({ ...f, endDate: e.target.value }))}
      />
    </div>
  );
}