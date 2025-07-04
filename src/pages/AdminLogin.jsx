import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/admin/login`, formData)
      setMessage(res.data.message);
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin-home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <>
      <style>
        {`
          .admin-login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f0f2f5;
            background: linear-gradient(135deg, #f0f2f5 0%, #e0e7ff 100%);
          }
          .form-container {
            background-color: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            width: 100%;
            max-width: 400px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .form-container:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          }
          .form-title {
            font-size: 1.75rem;
            font-weight: bold;
            text-align: center;
            color: #4b0082;
            margin-bottom: 1.5rem;
          }
          .form-group {
            margin-bottom: 1.25rem;
          }
          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .form-input:focus {
            border-color: #4b0082;
            box-shadow: 0 0 0 3px rgba(75, 0, 130, 0.2);
          }
          .submit-button {
            width: 100%;
            padding: 0.75rem;
            background-color: #4b0082;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
          }
          .submit-button:hover {
            background-color: #6a0dad;
            transform: translateY(-2px);
          }
          .submit-button:active {
            transform: translateY(0);
          }
          .message {
            margin-top: 1rem;
            text-align: center;
            color: #dc3545;
            font-size: 0.9rem;
          }
        `}
      </style>
      <div className="admin-login-container">
        <div className="form-container">
          <h2 className="form-title">Admin Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Admin Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default AdminLogin;