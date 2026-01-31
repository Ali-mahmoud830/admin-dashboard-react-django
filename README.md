# Admin Dashboard – PRO

A full-stack Admin Dashboard built as a practical, production-ready project using **React (TypeScript)** for the frontend and **Django REST Framework** for the backend.

The main goal of this project was to build a clean and scalable dashboard architecture that can be easily extended with new features and modules, while keeping the codebase organized and easy to maintain.

---

## 🔑 Core Features

### Authentication & Security
- JWT-based authentication (Access & Refresh tokens).
- Supports login using **username or email**.
- Protected routes on the frontend with basic role-based logic.
- Centralized token handling using Axios interceptors.

### Dashboard Overview
- Dynamic statistics fetched directly from backend APIs.
- Summary cards for users, products, and system alerts.
- Structure allows adding new metrics without major refactoring.

### Product Management
- Full CRUD operations (Create, Read, Update, Delete).
- Modal-based forms for creating and editing products.
- Real-time UI updates after each operation.

### User Management
- Admin-level user listing.
- Ability to delete users from the dashboard.
- Secure user creation handled through backend endpoints.

### UI & UX Decisions
- Focused on clarity and usability instead of heavy animations.
- Responsive sidebar layout suitable for admin workflows.
- Consistent spacing, colors, and typography for better readability.

---

## ⚙️ Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Backend:** Django, Django REST Framework
- **Authentication:** JWT (SimpleJWT)
- **State Management:** React Context API
- **API Communication:** Axios

---

## 🚀 Getting Started

### Backend Setup (Django)

```bash
cd backend

python -m venv venv

# Windows
.\venv\Scripts\activate
# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python create_admin_user.py
# Default credentials will be printed in the terminal

python manage.py runserver

#Backend run
http://127.0.0.1:8000

#Frontend Setup
cd frontend
npm install
npm run dev

#Frontend run
http://localhost:5173
