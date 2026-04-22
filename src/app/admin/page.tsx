"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Updating...");

    try {
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update', newMessage })
      });
      const data = await res.json();

      if (data.success) {
        setStatus("Message updated successfully!");
        setNewMessage("");
      } else {
        setStatus("Failed to update message.");
      }
    } catch (err) {
      setStatus("Error updating message.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'var(--color-cream)'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{
          padding: '4rem',
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--color-dark-gold)', marginBottom: '1rem' }}>
          Daughter Admin Panel
        </h1>
        <p style={{ opacity: 0.8, marginBottom: '2rem' }}>
          Update the secret message that Mom will see when she enters the phrase.
        </p>

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <textarea 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your beautiful message here..."
            rows={6}
            style={{
              padding: '1.5rem',
              borderRadius: '15px',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              background: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              outline: 'none',
              resize: 'vertical'
            }}
            required
          />
          <button type="submit" className="btn-primary" style={{ padding: '1rem' }}>
            Update Message
          </button>
        </form>
        {status && <p style={{ marginTop: '1.5rem', color: 'var(--color-sunset)', fontWeight: 600 }}>{status}</p>}
      </motion.div>
    </div>
  );
}
