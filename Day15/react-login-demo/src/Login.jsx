import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { USERS } from './User';
import { useAuth } from './AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();

  const onSubmit = e => {
    e.preventDefault();
    const match = USERS.find(u => 
      u.username === form.username && u.password === form.password
    );
    if (match) {
      login(match.username);
      nav('/dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 300, margin: 'auto' }}>
      <h2>Login</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Username</label><br/>
        <input value={form.username}
               onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
        />
      </div>
      <div>
        <label>Password</label><br/>
        <input type="password" value={form.password}
               onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
      </div>
      <button type="submit">Log In</button>
    </form>
  );
}
