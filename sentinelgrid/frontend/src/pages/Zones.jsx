import React, { useEffect, useState } from 'react';

const Zones = () => {
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', capacity: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', capacity: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5001/api/zones')
      .then(res => res.json())
      .then(data => {
        setZones(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load zones');
        setLoading(false);
      });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5001/api/zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newZone = await res.json();
        setZones([...zones, newZone]);
        setForm({ name: '', description: '', capacity: '' });
      } else {
        setError('Failed to add zone');
      }
    } catch {
      setError('Failed to add zone');
    }
  };

  const handleEdit = zone => {
    setEditingId(zone._id);
    setEditForm({ name: zone.name, description: zone.description, capacity: zone.capacity });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/zones/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updatedZone = await res.json();
        setZones(zones.map(z => (z._id === id ? updatedZone : z)));
        setEditingId(null);
      } else {
        setError('Failed to update zone');
      }
    } catch {
      setError('Failed to update zone');
    }
  };

  const handleDelete = async id => {
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/zones/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setZones(zones.filter(z => z._id !== id));
      } else {
        setError('Failed to delete zone');
      }
    } catch {
      setError('Failed to delete zone');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Zones</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="capacity" placeholder="Capacity" type="number" value={form.capacity} onChange={handleChange} />
        <button type="submit">Add Zone</button>
      </form>
      <ul>
        {zones.map(zone => (
          <li key={zone._id}>
            {editingId === zone._id ? (
              <form onSubmit={e => handleEditSubmit(e, zone._id)} style={{ display: 'inline' }}>
                <input name="name" value={editForm.name} onChange={handleEditChange} required />
                <input name="description" value={editForm.description} onChange={handleEditChange} />
                <input name="capacity" type="number" value={editForm.capacity} onChange={handleEditChange} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {zone.name} ({zone.description}) [Capacity: {zone.capacity}]
                <button onClick={() => handleEdit(zone)}>Edit</button>
                <button onClick={() => handleDelete(zone._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Zones;