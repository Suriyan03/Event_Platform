import { Link } from 'react-router-dom'; // <--- 1. ADD THIS IMPORT

const EventCard = ({ event }) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <img 
        src={event.image || "https://via.placeholder.com/300x150"} 
        alt={event.title} 
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />

      <div style={{ padding: '15px', flexGrow: 1 }}>
        <h3 style={{ margin: '0 0 10px', fontSize: '1.2rem', color: '#1f2937' }}>{event.title}</h3>
        
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '5px' }}>
          📅 {formattedDate}
        </p>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '15px' }}>
          📍 {event.location}
        </p>

        {/* Capacity Bar */}
        <div style={{ background: '#e5e7eb', borderRadius: '4px', height: '8px', marginBottom: '10px' }}>
          <div style={{ 
            background: event.attendees.length >= event.capacity ? '#ef4444' : '#10b981', 
            width: `${(event.attendees.length / event.capacity) * 100}%`, 
            height: '100%', 
            borderRadius: '4px' 
          }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
            <span>{event.attendees.length} / {event.capacity} Filled</span>
            {event.attendees.length >= event.capacity && <span style={{color: '#ef4444', fontWeight: 'bold'}}>SOLD OUT</span>}
        </div>

        {/* --- 2. REPLACE THE BUTTON WITH THIS LINK --- */}
        <Link 
            to={`/events/${event._id}`} 
            className="btn" 
            style={{ 
                display: 'block', 
                width: '100%', 
                marginTop: '15px', 
                textAlign: 'center',
                textDecoration: 'none' 
            }}
        >
          View Details
        </Link>
        {/* ------------------------------------------- */}
      </div>
    </div>
  );
};

export default EventCard;