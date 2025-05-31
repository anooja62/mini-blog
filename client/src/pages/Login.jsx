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
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        {/* Show smaller image on mobile, larger on md+ */}
        <img
          src={blogImg}
          alt="ScribbleSpace Illustration"
          className="w-3/4 max-w-sm md:max-w-none md:w-full h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md p-6 md:p-8 space-y-6 bg-white rounded-xl shadow-lg"
        >
          <h2 className="text-xl md:text-2xl text-center text-gray-700 font-semibold">
            Login to your account
          </h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF] placeholder-gray-400 text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF] placeholder-gray-400 text-base"
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
            <a href="/register" className="text-[#B28DFF] underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
