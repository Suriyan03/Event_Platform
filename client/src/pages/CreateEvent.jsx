import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    capacity: '',
    image: '' // Just a URL for now
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` } // Send token to backend
      };

      await axios.post('http://localhost:5000/api/events', formData, config);
      
      toast.success("Event Created!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to create event");
    }
  };

  return (
    <div className="form-card" style={{ maxWidth: '600px' }}>
      <h2 className="form-title">Host an Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input type="text" name="title" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Date & Time</label>
          <input type="datetime-local" name="date" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" name="location" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Capacity (Max Attendees)</label>
          <input type="number" name="capacity" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" placeholder="https://..." onChange={handleChange} />
          <small style={{color: '#666'}}>*Paste an image link from Google for now</small>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea 
            name="description" 
            rows="4"
            onChange={handleChange} 
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} 
          ></textarea>
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;