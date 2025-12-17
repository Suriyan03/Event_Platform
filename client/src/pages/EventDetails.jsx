import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if current user is already attending
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  const isAttending = event?.attendees.includes(userId);

  // Fetch Event Data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get('/events/' + id); // We need to add this GET route!
        setEvent(res.data);
        setLoading(false);
      } catch (error) {
        toast.error("Event not found");
        navigate('/');
      }
    };
    fetchEvent();
  }, [id, navigate]);

  // Handle RSVP Click
  const handleRSVP = async () => {
    if (!localStorage.getItem('token')) {
      toast.info("Please login to join events");
      navigate('/login');
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const res = await api.post('/events/' + id + '/rsvp', {}, config);
      
      toast.success(res.data.message);
      
      // Refresh event data to show new progress bar
      const updatedRes = await api.get('/events/' + id);
      setEvent(updatedRes.data);

    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <div className="container" style={{marginTop:'50px'}}>Loading...</div>;

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <button onClick={() => navigate(-1)} className="btn btn-outline" style={{marginBottom: '20px'}}>
        ← Back
      </button>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Left Side: Image */}
        <div style={{ flex: 1, minWidth: '300px' }}>
            <img 
              src={event.image || "https://via.placeholder.com/600x400"} 
              alt={event.title} 
              style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} 
            />
        </div>

        {/* Right Side: Details */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{event.title}</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>📍 {event.location}</p>
          <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '20px' }}>
            📅 {new Date(event.date).toLocaleString()}
          </p>

          <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>Capacity</h3>
            <div style={{ background: '#e5e7eb', height: '10px', borderRadius: '5px', marginBottom: '5px' }}>
                <div style={{ 
                    width: `${(event.attendees.length / event.capacity) * 100}%`,
                    background: '#4f46e5',
                    height: '100%',
                    borderRadius: '5px'
                }}></div>
            </div>
            <p>{event.attendees.length} / {event.capacity} spots filled</p>
          </div>

          <button 
            onClick={handleRSVP} 
            className="btn" 
            style={{ 
                width: '100%', 
                fontSize: '1.2rem', 
                padding: '15px',
                backgroundColor: isAttending ? '#ef4444' : '#4f46e5' 
            }}
          >
            {isAttending ? "Leave Event" : "Join Event"}
          </button>
          
          <div style={{ marginTop: '30px' }}>
            <h3>About this Event</h3>
            <p style={{ lineHeight: '1.6', color: '#374151' }}>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;