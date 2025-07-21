# 🗣️ DevDialogue

**Live Site:** [https://dev-dialogue.netlify.app/](https://dev-dialogue.netlify.app/)

## 📌 Project Purpose

DevDialogue is a full-stack MERN forum web application where users can engage in meaningful technical discussions. It was built as part of the test project to demonstrate strong proficiency in MERN stack development, secure data handling, real-world UI/UX, and production-ready deployment strategies.

This project focuses on:
- Scalable user interactions through posts and comments.
- Real-time engagement via voting and announcements.
- Role-based access and user/member/admin dashboards.
- Secure authentication and private routes.

---

## 🚀 Key Features

### 🏠 Home Page
- Search bar that filters posts by tags (backend search).
- Tag-based filter system.
- Sort by Popularity or Newest.
- Pagination (5 posts per page).
- Announcement section (conditionally visible).
- Vote & Comment counts on each post.

### 📝 Posts
- Add, View, and Delete posts.
- Limit: 5 posts per regular user.
- Become a member to post more.

### 🔐 Authentication
- Firebase Auth with social login (Google).
- JWT-based authorization.

### 🧑 User Dashboard
- My Profile (Badges, recent posts).
- Add Post (with React-Select).
- My Posts (Manage/Delete/View comments).
- Comment report system with feedback & modal view.

### 🛡️ Admin Dashboard
- Admin profile with pie chart (Posts, Comments, Users).
- Manage users (search + promote to admin).
- Reported Activities (moderate reports).
- Make Announcement.
- Add Tags feature.

### 💳 Membership
- Pay (dummy UI) to become a Gold member.
- Gold badge unlocks extended posting rights.

----

## 🧩 Tech Stack

- **Frontend:** React.js, React Router DOM, TailwindCSS, DaisyUI
- **Backend:** Express.js, MongoDB (MongoDB Atlas)
- **Authentication:** Firebase, JWT
- **State/Query:** React Context, React Hook Form, React Query (Tanstack)
- **Visualization:** Recharts
- **Forms & UX:** React-Select, React-Toastify, React-Share, React Awesome Button
- **Deployment:** 
  - Client: Vercel / Netlify
  - Server: Render

---

## 📦 NPM Packages Used

### Frontend
- `react`
- `react-dom`
- `react-router-dom`
- `firebase`
- `react-hook-form`
- `@tanstack/react-query`
- `axios`
- `react-select`
- `react-toastify`
- `react-share`
- `react-awesome-button`
- `recharts`

### Backend
- `express`
- `cors`
- `dotenv`
- `mongodb`
- `jsonwebtoken`

---
