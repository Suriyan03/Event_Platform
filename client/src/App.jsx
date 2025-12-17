import { Routes, Route, Navigate } from 'react-router-dom'; // <--- 1. Import Navigate
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Dashboard from './pages/Dashboard';

function App() {
  // 2. Check if the user is logged in
  const isAuthenticated = !!localStorage.getItem('token'); 

  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <Navbar />
      
      <div style={{ padding: '20px' }}>
        <Routes>
          {/* 3. CHANGE THIS LINE: */}
          {/* If logged in, show Home. If not, redirect to Login */}
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
          />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;