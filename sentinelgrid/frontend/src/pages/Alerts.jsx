import React, { useEffect, useState } from 'react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ type: '', message: '', triggeredBy: '', relatedZone: '', resolved: false });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ type: '', message: '', triggeredBy: '', relatedZone: '', resolved: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch alerts, users, and zones
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:5001/api/alerts').then(res => res.json()),
      fetch('http://localhost:5001/api/users').then(res => res.json()),
      fetch('http://localhost:5001/api/zones').then(res => res.json())
    ])
      .then(([alertsData, usersData, zonesData]) => {
        setAlerts(alertsData);
        setUsers(usersData);
        setZones(zonesData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load data');
        setLoading(false);
      });
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleEditChange = e => setEditForm({ ...editForm, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('http://localhost:5001/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newAlert = await res.json();
        setAlerts([...alerts, newAlert]);
        setForm({ type: '', message: '', triggeredBy: '', relatedZone: '', resolved: false });
      } else {
        setError('Failed to add alert');
      }
    } catch {
      setError('Failed to add alert');
    }
  };

  const handleEdit = alert => {
    setEditingId(alert._id);
    setEditForm({
      type: alert.type,
      message: alert.message,
      triggeredBy: alert.triggeredBy,
      relatedZone: alert.relatedZone,
      resolved: alert.resolved
    });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/alerts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updatedAlert = await res.json();
        setAlerts(alerts.map(a => (a._id === id ? updatedAlert : a)));
        setEditingId(null);
      } else {
        setError('Failed to update alert');
      }
    } catch {
      setError('Failed to update alert');
    }
  };

  const handleDelete = async id => {
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/alerts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAlerts(alerts.filter(a => a._id !== id));
      } else {
        setError('Failed to delete alert');
      }
    } catch {
      setError('Failed to delete alert');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Alerts</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="type" placeholder="Type" value={form.type} onChange={handleChange} required />
        <input name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <select name="triggeredBy" value={form.triggeredBy} onChange={handleChange}>
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
          ))}
        </select>
        <select name="relatedZone" value={form.relatedZone} onChange={handleChange}>
          <option value="">Select Zone</option>
          {zones.map(z => (
            <option key={z._id} value={z._id}>{z.name}</option>
          ))}
        </select>
        <label>
          Resolved
          <input name="resolved" type="checkbox" checked={form.resolved} onChange={e => setForm({ ...form, resolved: e.target.checked })} />
        </label>
        <button type="submit">Add Alert</button>
      </form>
      <ul>
        {alerts.map(alert => (
          <li key={alert._id}>
            {editingId === alert._id ? (
              <form onSubmit={e => handleEditSubmit(e, alert._id)} style={{ display: 'inline' }}>
                <input name="type" value={editForm.type} onChange={handleEditChange} required />
                <input name="message" value={editForm.message} onChange={handleEditChange} required />
                <select name="triggeredBy" value={editForm.triggeredBy} onChange={handleEditChange}>
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </select>
                <select name="relatedZone" value={editForm.relatedZone} onChange={handleEditChange}>
                  <option value="">Select Zone</option>
                  {zones.map(z => (
                    <option key={z._id} value={z._id}>{z.name}</option>
                  ))}
                </select>
                <label>
                  Resolved
                  <input name="resolved" type="checkbox" checked={editForm.resolved} onChange={e => setEditForm({ ...editForm, resolved: e.target.checked })} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {alert.type}: {alert.message} | 
                User: {typeof alert.triggeredBy === 'object'
                  ? alert.triggeredBy.name
                  : (users.find(u => u._id === alert.triggeredBy)?.name || alert.triggeredBy)} | 
                Zone: {typeof alert.relatedZone === 'object'
                  ? alert.relatedZone.name
                  : (zones.find(z => z._id === alert.relatedZone)?.name || alert.relatedZone)} | 
                Resolved: {alert.resolved ? 'Yes' : 'No'}
                <button onClick={() => handleEdit(alert)}>Edit</button>
                <button onClick={() => handleDelete(alert._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;