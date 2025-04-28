# 📰 News Explorer

**News Explorer** is a dynamic full-stack application that allows users to search for news articles, like, dislike, and save their favorite news, with real-time backend updates and a fully responsive UI.

---

## ✨ Features

- 🔎 **Search for Latest News** based on keywords or categories (Technology, Science, Business, Health, Sports, etc.)
- 👍 **Like and Dislike Articles** with instant feedback
- ❤️ **Save and Unsave Favorite Articles** to a personal Saved Posts section
- 🔥 **Real-Time Backend Sync** for Likes, Dislikes, and Saves
- 🧠 **Smart Saved Posts**:
  - Saved articles are stored with full details (title, description, image, etc.)
  - Saved posts are re-fetched fresh from the server, ensuring data consistency
- 🌀 **Smooth UI Animations** using Framer Motion
- 🖥️ **Fully Responsive Design**:
  - Optimized layouts for Desktop, Tablet, and Mobile devices
  - Adaptive Header, Search Bar, News Cards, Auth Pages, and Categories
- 🔒 **Authentication System**:
  - Users can Sign Up, Login, and manage their saved content including likes, dislikes and saved posts
- 🛠️ **Error Handling and Fallbacks**:
  - No results UI
  - No saved posts UI
  - Proper toasts and error alerts
- 🧹 **Beautiful, Clean, and Organized CSS structure**
- ⚡ **Performance Optimizations**:
  - Debounced search requests
  - Infinite scroll for fetching more news
  - Local storage sync for user sessions

---

## 🚀 How It Works

### 🏠 Home Page

- Displays latest news articles
- Users can search articles by keyword
- Users can click on category tags to filter by category

### 👍 Like / Dislike

- Authenticated users can like or dislike any news post
- Like/dislike counters update immediately on UI and backend

### ❤️ Saved Posts

- Clicking "❤️ Saved Posts" shows all saved articles
- Users can remove posts from saved by clicking the Heart again
- Saved posts page slides in smoothly and adapts fully to mobile

### 🔒 Authentication

- Users must login or sign up to save, like, or dislike posts
- Session is stored in localStorage for persistence

### 📱 Responsive Behavior

- Works perfectly on Desktop, Tablet, and Mobile devices
- Header, Search Bar, Buttons, Cards resize gracefully

---

## 🖼️ Screenshots

### 🚪 Landing Page (User Not Logged In)
<img width="1470" alt="Landing Page" src="https://github.com/user-attachments/assets/995b1daa-e59a-45bd-9bd0-cbe007af5dba" />

---

### 🔐 Login Page
<img width="1469" alt="Login Page" src="https://github.com/user-attachments/assets/b364fcf6-f07d-4576-bcd7-398109dcc07d" />

---

### 🏠 Home Page (After User Login)
<img width="1470" alt="Home Page After Login" src="https://github.com/user-attachments/assets/f8ba46f1-d796-4560-9f0b-8766f2783380" />

---

### ❤️ Posts Saved by User
<img width="1470" alt="Saved Posts" src="https://github.com/user-attachments/assets/81138ee9-c667-4df9-bfdd-70f7625de3b7" />

---

### 📱 Mobile View (Responsive Design)
<img width="330" alt="Mobile Screen UI" src="https://github.com/user-attachments/assets/3a56ab99-53c5-4c21-abef-208595fa4e75" />

---

### 📱 Tablet View (Responsive Design)
<img width="548" alt="iPad Screen Size" src="https://github.com/user-attachments/assets/62b9dabe-7cfc-4fd2-9f37-a4cb8097e5bb" />

---

## 🙌 Huge thanks for using News Explorer!
