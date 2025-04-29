import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactUs() {
  const formRef = useRef();
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('Sending…');

    try {
      const res = await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_USER_ID
      );
      console.log('EmailJS result:', res);
      setStatus('Message sent! Thank you.');
      formRef.current.reset();
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('Failed to send. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Contact Us</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label>Your Name</label><br />
          <input name="from_name" required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Your Email</label><br />
          <input name="from_email" type="email" required style={{ width: '100%' }} />
        </div>
        <div>
          <label>Message</label><br />
          <textarea name="message" required rows={5} style={{ width: '100%' }} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Send</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
