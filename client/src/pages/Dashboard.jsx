import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const res = await axios.get('http://localhost:5000/api/events/user/dashboard', config);
      setCreatedEvents(res.data.createdEvents);
      setAttendingEvents(res.data.attendingEvents);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load dashboard");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDelete = async (eventId) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success("Event Deleted");
      // Remove from UI instantly
      setCreatedEvents(createdEvents.filter(e => e._id !== eventId));
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  if (loading) return <div className="container" style={{marginTop:'50px'}}>Loading...</div>;

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h1 style={{ marginBottom: '30px' }}>My Dashboard</h1>

      {/* SECTION 1: Events I Attending */}
      <h2 style={{ color: '#4f46e5', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', marginBottom: '20px' }}>
        🎟️ Events I'm Attending
      </h2>
      
      {attendingEvents.length === 0 ? (
        <p style={{color: '#666', marginBottom: '40px'}}>You haven't joined any events yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px', marginBottom: '50px' }}>
          {attendingEvents.map(event => (
             <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* SECTION 2: Events I Created */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px', marginBottom: '20px' }}>
        <h2 style={{ color: '#4f46e5', margin: 0 }}>👑 Events I Organized</h2>
        <Link to="/create-event" className="btn" style={{ fontSize: '0.9rem', padding: '5px 15px' }}>+ New Event</Link>
      </div>

      {createdEvents.length === 0 ? (
        <p style={{color: '#666'}}>You haven't hosted any events yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
          {createdEvents.map(event => (
            <div key={event._id} style={{ position: 'relative' }}>
                <EventCard event={event} />
                {/* Delete Button Overlay */}
                <button 
                    onClick={() => handleDelete(event._id)}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}
                >
                    DELETE
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;