import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      // 1. SAVE THE TOKEN! (Crucial)
      // We store the token in the browser's local storage so we can use it later.
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Optional: store user info

      toast.success("Login Successful!");
      
      // 2. Redirect to Home (Dashboard)
      navigate('/');
      
      // 3. Force a reload to update the Navbar (simple way for now)
      window.location.reload();

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            placeholder="john@example.com" 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            placeholder="••••••••" 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;