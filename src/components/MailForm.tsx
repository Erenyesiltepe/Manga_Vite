import React, { useState } from 'react';

const MailForm: React.FC = () => {
  const [senderMail, setsenderMail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    // Here, you would typically send the data to your backend service
    // For example, using fetch or axios:

    fetch(`${import.meta.env.VITE_API_URL}/api/accounts/api/send-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
         "sender_email":senderMail,
         "subject": subject,
         "message": message 
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        alert('Email sent successfully');
    })
    .catch(error => console.error('Error:', error));

  };

  return (
    <form onSubmit={handleSend} style={styles.form}>
      <h3 style={styles.heading}>Send an Email</h3>
      <div style={styles.formGroup}>
        <label style={styles.label}>Your Mail:</label>
        <input
          type="email"
          value={senderMail}
          onChange={(e) => setsenderMail(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          style={styles.textarea}
        />
      </div>
      <button type="submit" style={styles.button}>Send</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,150)',
  },
  heading: {
    //textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#e53637',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default MailForm;
