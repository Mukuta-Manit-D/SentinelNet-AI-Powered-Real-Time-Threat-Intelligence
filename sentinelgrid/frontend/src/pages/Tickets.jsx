import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState([]);
  const [form, setForm] = useState({ code: '', user: '', zone: '', validFrom: '', validTo: '', status: 'active' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ code: '', user: '', zone: '', validFrom: '', validTo: '', status: 'active' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('http://localhost:5001/api/tickets').then(res => res.json()),
      fetch('http://localhost:5001/api/users').then(res => res.json()),
      fetch('http://localhost:5001/api/zones').then(res => res.json())
    ])
      .then(([ticketsData, usersData, zonesData]) => {
        setTickets(ticketsData);
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
      const res = await fetch('http://localhost:5001/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newTicket = await res.json();
        setTickets([...tickets, newTicket]);
        setForm({ code: '', user: '', zone: '', validFrom: '', validTo: '', status: 'active' });
      } else {
        setError('Failed to add ticket');
      }
    } catch {
      setError('Failed to add ticket');
    }
  };

  const handleEdit = ticket => {
    setEditingId(ticket._id);
    setEditForm({
      code: ticket.code,
      user: ticket.user,
      zone: ticket.zone,
      validFrom: ticket.validFrom ? ticket.validFrom.substring(0, 16) : '',
      validTo: ticket.validTo ? ticket.validTo.substring(0, 16) : '',
      status: ticket.status
    });
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updatedTicket = await res.json();
        setTickets(tickets.map(t => (t._id === id ? updatedTicket : t)));
        setEditingId(null);
      } else {
        setError('Failed to update ticket');
      }
    } catch {
      setError('Failed to update ticket');
    }
  };

  const handleDelete = async id => {
    setError('');
    try {
      const res = await fetch(`http://localhost:5001/api/tickets/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTickets(tickets.filter(t => t._id !== id));
      } else {
        setError('Failed to delete ticket');
      }
    } catch {
      setError('Failed to delete ticket');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Tickets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="code" placeholder="Code" value={form.code} onChange={handleChange} required />
        <select name="user" value={form.user} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map(u => (
            <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
          ))}
        </select>
        <select name="zone" value={form.zone} onChange={handleChange}>
          <option value="">Select Zone</option>
          {zones.map(z => (
            <option key={z._id} value={z._id}>{z.name}</option>
          ))}
        </select>
        <input name="validFrom" type="datetime-local" value={form.validFrom} onChange={handleChange} />
        <input name="validTo" type="datetime-local" value={form.validTo} onChange={handleChange} />
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="active">Active</option>
          <option value="used">Used</option>
          <option value="expired">Expired</option>
        </select>
        <button type="submit">Add Ticket</button>
      </form>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            {editingId === ticket._id ? (
              <form onSubmit={e => handleEditSubmit(e, ticket._id)} style={{ display: 'inline' }}>
                <input name="code" value={editForm.code} onChange={handleEditChange} required />
                <select name="user" value={editForm.user} onChange={handleEditChange} required>
                  <option value="">Select User</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </select>
                <select name="zone" value={editForm.zone} onChange={handleEditChange}>
                  <option value="">Select Zone</option>
                  {zones.map(z => (
                    <option key={z._id} value={z._id}>{z.name}</option>
                  ))}
                </select>
                <input name="validFrom" type="datetime-local" value={editForm.validFrom} onChange={handleEditChange} />
                <input name="validTo" type="datetime-local" value={editForm.validTo} onChange={handleEditChange} />
                <select name="status" value={editForm.status} onChange={handleEditChange}>
                  <option value="active">Active</option>
                  <option value="used">Used</option>
                  <option value="expired">Expired</option>
                </select>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {ticket.code} | User: {typeof ticket.user === 'object' ? ticket.user.name : (users.find(u => u._id === ticket.user)?.name || ticket.user)} | Zone: {typeof ticket.zone === 'object' ? ticket.zone.name : (zones.find(z => z._id === ticket.zone)?.name || ticket.zone)} | Status: {ticket.status}
                <div>
                  <QRCodeSVG value={ticket.code} size={64} />
                </div>
                <button onClick={() => handleEdit(ticket)}>Edit</button>
                <button onClick={() => handleDelete(ticket._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tickets;