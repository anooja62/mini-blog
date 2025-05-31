import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export default function Home() {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/posts/${editId}`, { title, content });
      } else {
        await axios.post("/posts", { title, content });
      }
      setIsOpen(false);
      setTitle("");
      setContent("");
      setEditId(null);
      const res = await axios.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error saving post:", err);
      alert("Failed to save post");
    }
  };
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Error deleting post");
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDF6F3] via-[#FFEFEF] to-[#FFE3E3] text-gray-800 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-[#B28DFF] italic">LetsBlog</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-[#B28DFF]">
            Home
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="text-gray-600 hover:text-[#B28DFF]"
          >
            Write
          </button>
          {user ? (
            <button
              onClick={logout}
              className="text-gray-600 hover:text-[#B28DFF]"
            >
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
        <h2 className="text-4xl font-extrabold mb-4">
          Share your stories with the world
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Whether it's a quick thought or a detailed tutorial, LetsBlog helps
          you express yourself and connect with others.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-6 px-6 py-3 bg-gradient-to-r from-[#B28DFF] to-[#A5D8FF] text-[#2C3E50] font-semibold rounded-lg shadow hover:scale-105 transition-transform"
        >
          Start Writing
        </button>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Latest Posts
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link
                to={`/posts/${post._id}`}
                key={post._id}
                className="group relative"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setTitle(post.title);
                        setContent(post.content);
                        setEditId(post._id); // track which post we're editing
                        setIsOpen(true);
                      }}
                      className="text-[#B28DFF] hover:text-[#9D7FFF]"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(post._id);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <h4 className="text-xl font-bold mb-2 text-[#2C3E50] group-hover:text-[#B28DFF] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {post.content.slice(0, 100)}...
                    </p>
                    <span className="mt-auto text-sm font-medium text-[#B28DFF]">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts yet. Be the first to write one!
            </p>
          )}
        </div>
      </section>

      {/* Modal for Post Creation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            setEditId(null);
            setTitle("");
            setContent("");
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title className="text-lg font-bold leading-6 text-[#B28DFF]">
                  Create New Post
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF]"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <textarea
                    placeholder="Write your story..."
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#B28DFF] min-h-[120px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsOpen(false);
                        setEditId(null);
                        setTitle("");
                        setContent("");
                      }}
                      className="px-4 py-2 text-sm text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-semibold text-white bg-[#B28DFF] rounded-md hover:bg-[#A08CFF]"
                    >
                      Publish
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
