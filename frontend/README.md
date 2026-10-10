# 🎓 Learnix — Frontend Application

This directory contains the client-side single-page application (SPA) for **Learnix**, built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Clerk Authentication**.

> 💡 For comprehensive setup instructions for the complete full-stack project, please see the [Main Project README](../README.md).

---

## ⚡ Tech Stack & Libraries

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Authentication**: [Clerk React](https://clerk.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Code Linter**: [Oxlint](https://oxc.rs/)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file in this directory based on `.env.example`:
```bash
cp .env.example .env
```

Ensure the following variables are defined:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Learnix
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch at [http://localhost:5173](http://localhost:5173).

---

## 📦 Available Scripts

- `npm run dev`: Starts the local Vite development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles production-ready assets into the `dist/` directory.
- `npm run preview`: Locally previews the production build.
- `npm run lint`: Runs fast code linting via `oxlint`.

---

## 📁 Directory Overview

```text
frontend/src/
├── assets/          # Static images, illustrations, and SVG badges
├── components/      # Reusable components (NevBar, SideBar, CourseCard)
├── pages/           # Main views: Home, All_Courses, My_Courses, Doubts, Blogs
├── services/        # Centralized Axios API abstraction layer
├── App.jsx          # Main application layout & responsive navigation bars
├── Routing.jsx      # Client-side route declarations
├── index.css        # Global stylesheet and Tailwind CSS imports
└── main.jsx         # App bootstrapping and ClerkProvider configuration
```
