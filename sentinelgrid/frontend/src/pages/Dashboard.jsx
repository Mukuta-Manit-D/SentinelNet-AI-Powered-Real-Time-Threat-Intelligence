import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    fetch('http://localhost:5001/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setForm({ name: '', email: '', role: '' });
    }
  };

  const handleEdit = user => {
    setEditingId(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  };

  const handleEditSubmit = async (e, userId) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    });
    if (res.ok) {
      const updatedUser = await res.json();
      setUsers(users.map(u => (u._id === userId ? updatedUser : u)));
      setEditingId(null);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Users</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="role"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
          required
        />
        <button type="submit">Add User</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {editingId === user._id ? (
                <form onSubmit={e => handleEditSubmit(e, user._id)} style={{ display: 'inline' }}>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    name="role"
                    value={editForm.role}
                    onChange={handleEditChange}
                    required
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
                </form>
              ) : (
                <>
                  {user.name} ({user.email}) [{user.role}]
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={async () => {
                    await fetch(`http://localhost:5001/api/users/${user._id}`, { method: 'DELETE' });
                    setUsers(users.filter(u => u._id !== user._id));
                  }}>
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;