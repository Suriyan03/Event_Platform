import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      toast.success("Registration Successful!");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" placeholder="John Doe" onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="••••••••" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>Sign Up</button>
      </form>
    </div>
  );
};

export default Register;