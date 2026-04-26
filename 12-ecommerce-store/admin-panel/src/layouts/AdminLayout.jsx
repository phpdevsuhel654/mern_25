import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBox, FiShoppingCart } from 'react-icons/fi';

const AdminLayout = ({ children }) => {
  const { pathname } = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/', icon: <FiHome /> },
    { name: 'Users', path: '/users', icon: <FiUsers /> },
    { name: 'Products', path: '/products', icon: <FiBox /> },
    { name: 'Orders', path: '/orders', icon: <FiShoppingCart /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-5 text-xl font-bold border-b">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 ${
                pathname === item.path ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <div className="bg-white p-4 shadow flex justify-between">
          <h2 className="font-semibold">Admin Dashboard</h2>
          <button className="text-sm bg-black text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;