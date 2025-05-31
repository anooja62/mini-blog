import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

export default function Home() {
    const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6F3] via-[#FFEFEF] to-[#FFE3E3] text-gray-800 font-sans ">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-[#B28DFF] italic">LetsBlog</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-[#B28DFF]">Home</Link>
          <Link to="/create-post" className="text-gray-600 hover:text-[#B28DFF]">Write</Link>
          {user ? (
  <button onClick={logout} className="text-gray-600 hover:text-[#B28DFF]">
    Logout
  </button>
) : (
  <Link to="/login" className="text-gray-600 hover:text-[#B28DFF]">
    Login
  </Link>
)}

        </nav>
      </header>

      {/* Hero */}
      <section className="text-center px-6 py-16 bg-gradient-to-r from-[#FFF5F3] via-[#FFEAEA] to-[#FFDCDC]">
        <h2 className="text-4xl font-extrabold mb-4">Share your stories with the world</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Whether it's a quick thought or a detailed tutorial, LetsBlog helps you express yourself and connect with others.
        </p>
        <Link to="/create-post">
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-[#B28DFF] to-[#A5D8FF] text-[#2C3E50] font-semibold rounded-lg shadow hover:scale-105 transition-transform">
            Start Writing
          </button>
        </Link>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Latest Posts</h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/posts/${post._id}`} key={post._id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h4 className="text-xl font-bold mb-2 text-[#2C3E50] group-hover:text-[#B28DFF] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {post.content.slice(0, 100)}...
                    </p>
                    <span className="mt-auto text-sm font-medium text-[#B28DFF]">Read More →</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No posts yet. Be the first to write one!</p>
          )}
        </div>
      </section>
    </div>
  );
}
