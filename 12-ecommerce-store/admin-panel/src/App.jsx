import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminRoute from './routes/AdminRoute';
import AdminLayout from './layouts/AdminLayout';

import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <AdminRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route path="/users" element={<AdminLayout><Users /></AdminLayout>} />
        <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
        <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;