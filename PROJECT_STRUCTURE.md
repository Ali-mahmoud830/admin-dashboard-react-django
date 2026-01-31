# 📂 Project Architecture & Structure

This document provides a detailed overview of the codebase structure for the **Admin Dashboard** project. It is designed to help developers and clients understand the organization of the React frontend and Django backend.

## 🏗️ High-Level Architecture

The project is divided into two distinct applications:

1.  **`backend/`**: A separate Django Rest Framework (DRF) API server.
2.  **`frontend/`**: A standalone React Single Page Application (SPA).

---

## 🐍 Backend Structure (Django)

The backend follows a standard, modular Django App architecture.

```text
backend/
├── config/                 # Project-level configuration
│   ├── settings.py         # App registration, DB, CORS, & JWT settings
│   ├── urls.py             # Main URL routing (includes /api/ endpoints)
│   └── wsgi.py             # WSGI entry point for deployment
│
├── accounts/               # [APP] Authentication & User Management
│   ├── backends.py         # Custom Auth Backend (Email OR Username login)
│   ├── models.py           # Custom User Model (extending AbstractUser)
│   ├── serializers.py      # DRF Serializers for User & Registration
│   ├── urls.py             # Auth routes (login, refresh, user CRUD)
│   └── views.py            # API ViewSets for Auth logic
│
├── products/               # [APP] Inventory Management
│   ├── models.py           # Product Database Schema
│   ├── serializers.py      # JSON Transformation logic
│   ├── views.py            # CRUD ViewSets + Dashboard Stats Logic
│   └── urls.py             # Product API routes
│
├── manage.py               # Django CLI utility
├── requirements.txt        # Python dependencies
└── create_admin_user.py    # Utility script to bootstrap admin
```

### Key Design Decisions
- **`accounts` App**: Separated user logic to keep authentication distinct from business logic.
- **`products` App**: Contains all inventory logic. Currently supports scaling to Categories or Orders.
- **Settings**: Configured efficiently with `CORS_ALLOW_ALL_ORIGINS` (dev) and `SIMPLE_JWT` for secure token auth.

---

## ⚛️ Frontend Structure (React + Vite)

The frontend uses a feature-first, component-based architecture powered by Vite.

```text
frontend/
├── src/
│   ├── api/
│   │   └── axios.ts        # Centralized HTTP Client (Auto-attaches Tokens)
│   │
│   ├── components/         # Reusable UI Components
│   │   ├── layout/         
│   │   │   ├── Layout.tsx  # Main Wrapper (Sidebar + Content)
│   │   │   └── Sidebar.tsx # Responsive Navigation
│   │   └── ProtectedRoute.tsx # HOC for Securing Pages (Auth Guard)
│   │
│   ├── context/
│   │   └── AuthContext.tsx # Global State (User Session & Login/Logout Logic)
│   │
│   ├── pages/              # Main View Controllers
│   │   ├── Login.tsx       # Authentication Page
│   │   ├── Dashboard.tsx   # Stats Overview (Charts/Cards)
│   │   ├── ProductList.tsx # Product CRUD Table & Modal
│   │   └── UserList.tsx    # User Management Interface
│   │
│   ├── App.tsx             # Main Router Configuration
│   ├── main.tsx            # Entry Point
│   └── index.css           # Global Design System (Variables, Resets)
│
├── public/                 # Static Assets (Favicons, images)
├── package.json            # Node Dependencies
└── vite.config.ts          # Build Tool Configuration
```

### Key Design Decisions
- **Context API (`AuthContext`)**: Manages user session globally without needing Redux, keeping the app lightweight.
- **Axios Interceptors (`api/axios.ts`)**: Automatically handles Token Refreshing (401 errors) seamlessly.
- **Component Reusability**: The `Layout` and `Sidebar` are decoupled, making it easy to add new pages.
- **CSS Variables**: `index.css` defines a strict color palette for consistency across the entire UI.
