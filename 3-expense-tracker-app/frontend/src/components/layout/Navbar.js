import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow">
      <h1 className="font-semibold">Dashboard</h1>
      <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}