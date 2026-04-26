import { useEffect, useState } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';
import UserModal from '../components/UserModal';
import ConfirmModal from '../components/ConfirmModal';
import { createUser, updateUser } from '../api/userApi';
import { getAvatar } from '../utils/avatar';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    const res = await API.get('/admin/users', {
      params: { page, search },
    });

    setUsers(res.data.users);
    setPages(res.data.pages);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSave = async (data) => {
    try {
      if (selected) {
        await updateUser(selected._id, data);
        toast.success('User updated');
      } else {
        await createUser(data);
        toast.success('User created');
      }

      setModalOpen(false);
      setSelected(null);
      fetchUsers();
    } catch {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/admin/users/${deleteId}`);
      toast.success('User deleted');

      setConfirmOpen(false);
      fetchUsers();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Users</h1>

        <button
          onClick={() => {
            setSelected(null);
            setModalOpen(true);
          }}
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add User
        </button>
      </div>

      {/* Search */}
      <input
        className="border p-2 mb-4 w-full"
        placeholder="Search users..."
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3 flex items-center gap-3">
                  <img
                    src={getAvatar(u.name)}
                    className="w-8 h-8 rounded-full"
                  />
                  {u.name}
                </td>

                <td>{u.email}</td>
                <td>{u.role}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => {
                      setSelected(u);
                      setModalOpen(true);
                    }}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(u._id);
                      setConfirmOpen(true);
                    }}
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

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {[...Array(pages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? 'bg-black text-white' : ''
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modals */}
      <UserModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        user={selected}
      />

      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        text="Are you sure you want to delete this user?"
      />
    </div>
  );
};

export default Users;