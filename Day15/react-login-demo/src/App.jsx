import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './Login';
import ContactUs from './ContactUs';
import PrivateRoute from './PrivateRoute';

function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div style={{ padding:50 }}>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ paddingLeft: 100 ,fontSize:30}}>
          <Link to="/login" style={{ padding: 100 }}>Login</Link>
          <Link to="/dashboard" style={{padding:100}}>Dashboard</Link>
          <Link to="/contact" style={{ padding: 100 }}>Contact Us</Link>

        </nav>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard"
                 element={
                   <PrivateRoute>
                     <Dashboard />
                   </PrivateRoute>
                 }
          />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
