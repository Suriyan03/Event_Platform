import { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events when page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/events');
        setEvents(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div style={{textAlign: 'center', marginTop: '50px'}}>Loading Events...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', marginTop: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Upcoming Events</h1>
        
        {/* Only show "Create Event" button if logged in */}
        {localStorage.getItem('token') && (
          <Link to="/create-event" className="btn">
            + Create Event
          </Link>
        )}
      </div>

      {events.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No events found. Be the first to create one!</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '25px' 
        }}>
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;