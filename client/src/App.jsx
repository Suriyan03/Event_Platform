import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import CreateEvent from './pages/CreateEvent';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Navbar from './components/Navbar'; // <--- Import Navbar
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      
      <Navbar /> {/* <--- Add Navbar here, above Routes */}
      
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  {/* <--- Add this line */}
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;