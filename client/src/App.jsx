import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
// import CreatePost from './pages/CreatePost';
// import MyPosts from './pages/MyPosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/create" element={<CreatePost />} />
        <Route path="/posts" element={<MyPosts />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
