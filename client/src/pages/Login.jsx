import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import blogImg from '/images/blog.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      login(res.data.token);
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="hidden md:block md:w-1/2">
        <img src={blogImg} alt="ScribbleSpace Illustration" className="w-full h-full object-contain" />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-br from-[#FFF5F3] via-[#FFEAEA] to-[#FFDCDC]">
        <form onSubmit={handleLogin} className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 space-y-6">
          <h2 className="text-lg text-center text-gray-700">Login to your account</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#B28DFF] to-[#A5D8FF] text-[#2C3E50] font-semibold rounded-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{' '}
            <a href="/register" className="text-[#B28DFF] underline">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
}
