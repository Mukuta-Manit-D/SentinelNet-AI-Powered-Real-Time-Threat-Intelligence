import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { QRCodeSVG } from 'qrcode.react';

const ScanTicket = () => {
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);

  // Fetch all tickets to display their QR codes
  useEffect(() => {
    fetch('http://localhost:5001/api/tickets')
      .then(res => res.json())
      .then(setTickets)
      .catch(() => setTickets([]));
  }, []);

  const handleScan = async data => {
    if (data) {
      setResult(data);
      // Send scanned code to backend for entry/exit logging
      try {
        const res = await fetch('http://localhost:5001/api/accesslogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: data }),
        });
        if (res.ok) {
          setMessage('Entry/Exit logged!');
        } else {
          setMessage('Failed to log entry/exit.');
        }
      } catch {
        setMessage('Error connecting to server.');
      }
    }
  };

  const handleError = err => {
    setMessage('Camera error: ' + err);
  };

  return (
    <div>
      <h2>Scan Ticket QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={result => {
          if (result?.text) handleScan(result.text);
        }}
        style={{ width: '300px' }}
      />
      <p>Scanned Code: {result}</p>
      <p>{message}</p>
      <h3>All Tickets (for testing)</h3>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>
            {ticket.code}
            <div>
              <QRCodeSVG value={ticket.code} size={64} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScanTicket;