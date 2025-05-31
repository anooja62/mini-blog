import { useState } from 'react';
import axios from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/users/register', { email, password ,username});
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <form onSubmit={handleRegister} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-700">Register</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B28DFF] placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B28DFF] placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#B28DFF] placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#B28DFF] to-[#A5D8FF] text-[#2C3E50] font-semibold rounded-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          Register
        </button>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-[#B28DFF] underline">Login</a>
        </p>
      </form>
    </div>
  );
}
