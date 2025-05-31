

# 📝 Mini Blog Platform

A simple blog platform built with the MERN stack (MongoDB, Express, React, Node.js) where users can register, log in, and manage their blog posts.

## 🚀 Features

- User registration and login with JWT authentication
- Create, read, update, and delete blog posts
- Posts are user-specific
- React Context for authentication state
- Loading spinners and error handling
- Responsive UI using TailwindCSS
- Modal-based post creation/editing
- Line-clamp with "Read More" toggle

## 📁 Project Structure

```

/backend    → Express.js + MongoDB (Mongoose)
/frontend   → React + React Router + TailwindCSS

````

---

## 🧰 Technologies Used

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for auth
- bcrypt for hashing

### Frontend:
- React.js (functional components + hooks)
- React Router DOM
- Axios
- TailwindCSS
- Context API for auth state
- Headless UI (modal)
- lucide-react icons

---

## ⚙️ Setup Instructions

### Prerequisites:
- Node.js & npm
- MongoDB running locally or via Atlas

---

### 📦 Backend Setup

```bash
cd backend
npm install
npm run dev
````

> Runs on `http://localhost:8000`

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Runs on `http://localhost:5173`

---

## 🔐 API Endpoints

### Auth

* `POST /api/users/register` – Register (email, password)
* `POST /api/users/login` – Login (returns JWT)

### Posts

* `GET /api/posts` – Fetch user's posts (requires token)
* `POST /api/posts` – Create post (requires token)
* `PUT /api/posts/:id` – Edit post (requires token)
* `DELETE /api/posts/:id` – Delete post (requires token)

---

## 🧪 Testing

1. Register a new user
2. Log in and save the token in localStorage (done automatically via React Context)
3. Create and manage your blog posts

---

## 🧩 Future Improvements (if more time available)

* ✅ Add Redux Toolkit for state management
* ✅ Add client-side & server-side form validations
* ✅ Enhance UI with animations and component libraries
* ✅ Add user avatars and profile info
* ✅ Add pagination or infinite scroll
* ✅ Save post drafts and autosave logic

---



