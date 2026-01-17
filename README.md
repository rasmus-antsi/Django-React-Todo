# Todo App - Django + React Full-Stack Project

A full-stack todo application built as a learning project to understand how to connect Django REST Framework with React. This project demonstrates modern web development practices, including authentication, API integration, and component-based frontend architecture.

## 🎯 Project Overview

This is a portfolio project created to learn and demonstrate:
- Building RESTful APIs with Django REST Framework
- Creating modern, responsive UIs with React
- Implementing user authentication and authorization
- Connecting frontend and backend applications
- Managing state with React Context API
- Handling API calls and error management

## ✨ Features

- **User Authentication**
  - User registration and login
  - Token-based authentication
  - Protected routes
  
- **Todo Management**
  - Create, read, update, and delete todos
  - Mark todos as complete/incomplete
  - User-specific todo lists (users can only see their own todos)
  - Optional todo descriptions

- **Modern UI/UX**
  - Minimal, grayscale design with premium aesthetics
  - Responsive layout
  - Smooth transitions and hover effects
  - Clean, intuitive interface

## 🛠️ Tech Stack

### Backend
- **Django 5.2.5** - Python web framework
- **Django REST Framework** - Building REST APIs
- **django-allauth** - Authentication
- **dj-rest-auth** - RESTful authentication endpoints
- **django-cors-headers** - Handling CORS for React frontend
- **SQLite** - Database (development)

### Frontend
- **React 19.2.0** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management

## 📸 Screenshots

![Landing Page](readme-pics/Screenshot%202026-01-17%20at%2002.28.33.png)

![Todo List Interface](readme-pics/Screenshot%202026-01-17%20at%2002.28.47.png)

## 🏗️ Architecture

### Project Structure
```
Todo-App/
├── backend/          # Django backend
├── frontend/         # React frontend
├── venv/            # Python virtual environment (create in root)
├── requirements.txt  # Python dependencies
└── README.md
```

### Backend Structure
```
backend/
├── _core/           # Django project settings
├── a_todo/          # Todo app
│   ├── models.py    # Todo model
│   ├── serializers.py # DRF serializers
│   ├── views.py     # API views (function-based)
│   └── urls.py      # API routes
└── manage.py
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/  # React components
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── TodoList.jsx
│   │   └── TodoItem.jsx
│   ├── contexts/    # React Context
│   │   └── AuthContext.jsx
│   ├── services/    # API service layer
│   │   └── api.js
│   └── App.jsx      # Main app with routing
```

## 🚀 Getting Started

### Prerequisites
- Python 3.14+
- Node.js and npm
- Virtual environment (recommended)

### Backend Setup

1. **Create virtual environment in the project root**
   ```bash
   python -m venv venv
   ```

2. **Activate virtual environment**
   ```bash
   # On macOS/Linux:
   source venv/bin/activate
   
   # On Windows:
   venv\Scripts\activate
   ```

3. **Install dependencies from requirements.txt**
   ```bash
   pip install -r requirements.txt
   ```

4. **Navigate to backend directory**
   ```bash
   cd backend
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create superuser** (optional, for Django admin)
   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/registration/` - Register new user
- `POST /api/auth/login/` - Login user
- `POST /api/auth/logout/` - Logout user
- `GET /api/auth/user/` - Get current user info

### Todos
- `GET /api/todos/` - List all todos for authenticated user
- `POST /api/todos/` - Create new todo
- `GET /api/todos/<id>/` - Get specific todo
- `PATCH /api/todos/<id>/` - Update todo
- `DELETE /api/todos/<id>/` - Delete todo

All todo endpoints require authentication (Token in Authorization header).

## 🔐 Authentication Flow

1. User registers/logs in through React frontend
2. Django returns authentication token
3. Token is stored in browser's localStorage
4. Token is sent with every API request in the Authorization header
5. Django validates token and filters todos by user

## 🎓 Learning Outcomes

This project helped me learn:

- **Django REST Framework**: Building RESTful APIs, serializers, and views
- **React Hooks**: useState, useEffect, useContext for state management
- **React Router**: Client-side routing and protected routes
- **API Integration**: Making HTTP requests, handling responses and errors
- **CORS Configuration**: Enabling cross-origin requests between frontend and backend
- **Authentication**: Token-based auth, secure API endpoints
- **Full-Stack Architecture**: Separating frontend and backend, API design

## 🔧 Development Notes

- Backend uses function-based views (easier to understand for learning)
- Frontend uses Context API for authentication state (no external state management library)
- CORS is configured to allow requests from the React dev server
- Database uses SQLite for simplicity (can be switched to PostgreSQL for production)

## 📝 Future Enhancements

- [ ] Add todo categories/tags
- [ ] Implement todo due dates
- [ ] Add search and filter functionality
- [ ] Implement todo sorting
- [ ] Add dark/light theme toggle
- [ ] Deploy to production (Heroku, Vercel, etc.)

## 📄 License

This project is open source and available for learning purposes.

---

**Note**: This is a portfolio project created for learning purposes. The focus was on understanding the connection between Django and React, authentication flows, and full-stack development patterns.
