import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // Check if user is logged in (simple check)
  const token = localStorage.getItem('token'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload(); // Refresh to update UI
  };

  return (
    <nav style={{ background: 'white', borderBottom: '1px solid #e5e7eb', padding: '1rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4f46e5', textDecoration: 'none' }}>
          EventApp
        </Link>

        <div style={{ display: 'flex', gap: '15px' }}>
          {!token ? (
            <>
              {/* Show these if NOT logged in */}
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn">Register</Link>
            </>
          ) : (
            <>
              {/* Show these if Logged IN */}
              <Link to="/dashboard" style={{ marginRight: '15px', color: '#1f2937', fontWeight: '500', textDecoration: 'none' }}>
  My Dashboard
</Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{ border: 'none', color: '#ef4444' }}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;