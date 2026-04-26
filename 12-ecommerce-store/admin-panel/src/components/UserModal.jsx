import { useState, useEffect } from 'react';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '',
      });
    }
  }, [user]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">
          {user ? 'Edit User' : 'Add User'}
        </h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        {!user && (
          <input
            type="password"
            className="border p-2 w-full mb-2"
            placeholder="Password"
            onChange={(e) => setForm({...form, password: e.target.value})}
          />
        )}

        <select
          className="border p-2 w-full mb-4"
          value={form.role}
          onChange={(e) => setForm({...form, role: e.target.value})}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="border px-3 py-1 rounded">
            Cancel
          </button>

          <button
            onClick={() => onSubmit(form)}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      </div>

    </div>
  );
};

export default UserModal;