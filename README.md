<div align="center">

# 🍳 ImhotepChef

*Where Culinary Magic Meets Modern Technology*

[![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)](https://djangoproject.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com/)

**A modern, AI-powered recipe management platform that transforms your ingredients into culinary masterpieces** 

[🚀 Quick Start](#-quick-start-for-contributors) • [✨ Features](#-features) • [🛠️ Tech Stack](#️-tech-stack) • [📱 Demo](#-demo) • [🤝 Contributing](#-contributing)

---

</div>

## ✨ Features

🔍 **AI-Powered Recipe Generation** - Transform your available ingredients into delicious recipes using advanced AI  
👤 **Smart User Profiles** - Personalized cooking experience with user preferences and dietary restrictions  
📚 **Recipe History** - Keep track of your culinary adventures with comprehensive recipe history  
🔐 **Secure Authentication** - Multi-authentication system with Google OAuth and JWT tokens  
📧 **Email Verification** - Secure account verification and password recovery system  
📱 **Responsive Design** - Beautiful, mobile-first interface that works on all devices  
🎨 **Modern UI/UX** - Clean, intuitive design built with Tailwind CSS  
⚡ **Real-time Updates** - Instant recipe generation and seamless user experience  

## 🛠️ Tech Stack

### Backend
- **Django REST Framework** - Robust API development
- **PostgreSQL** - Reliable data persistence
- **JWT Authentication** - Secure token-based auth
- **Google AI (Gemini)** - Advanced recipe generation
- **Docker** - Containerized deployment

### Frontend
- **React 19** - Modern component-based UI
- **Vite** - Lightning-fast development
- **Tailwind CSS** - Utility-first styling
- **Axios** - Seamless API communication
- **React Router** - Dynamic navigation

## 📱 Demo

### 🏠 Homepage
Beautiful landing page introducing users to the magic of AI-powered cooking

### 🔐 Authentication System
- **Register/Login** - Secure user authentication
- **Google OAuth** - One-click social login
- **Email Verification** - Secure account activation
- **Password Recovery** - Easy password reset process

### 🍽️ Recipe Generation
Input your available ingredients and let our AI chef create personalized recipes just for you!

### 👤 User Dashboard
- **Profile Management** - Update personal information
- **Recipe History** - Browse your culinary journey
- **Usage Statistics** - Track your monthly recipe generation

---

## 🚀 Quick Start for Contributors

> **Get cooking in less than 2 minutes!** 🚀

### 🔧 Prerequisites
- 🐳 **Docker & Docker Compose** - [Install Docker](https://docs.docker.com/get-docker/)
- 📦 **Git** - [Install Git](https://git-scm.com/downloads)

### ⚡ Setup (One Command!)

**1. Clone & Navigate**
```bash
git clone https://github.com/Kbassem10/ImhotepChef.git
cd ImhotepChef
```

**2. Set Up Environment Variables** 🔑
Create a `.env` file in the `backend/ImhotepChef` directory with your Gemini API keys:
```bash
# Navigate to backend directory
cd backend/ImhotepChef

# Create .env file with required Gemini API keys
cat > .env << 'EOF'
# Gemini API Keys (Required - Get from https://aistudio.google.com/app/apikey)
GEMINI_API_KEY_1=your_first_gemini_api_key_here
GEMINI_API_KEY_2=your_second_gemini_api_key_here

# Return to project root
cd ../..
```

> 🚨 **Important**: You must have at least **1 Gemini API key** and up to **2 API keys** for the AI recipe generation to work. Get your free API keys from [Google AI Studio](https://aistudio.google.com/app/apikey).

**3. Launch the Magic** ✨
```bash
docker compose up --build
```

**That's it! 🎉 Your culinary assistant is ready!**

### 🎯 What This Does

✅ **Database Setup** - PostgreSQL container (port 5430)  
✅ **Backend Magic** - Django REST API (http://localhost:8000)  
✅ **Frontend Beauty** - React application (http://localhost:3000)  
✅ **Admin Panel** - Django admin with demo credentials  
✅ **Auto-Migration** - Database schema setup  
✅ **Hot Reload** - Live code changes  

### 🌐 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| 🎨 **Frontend** | http://localhost:3000 | Main application interface |
| ⚡ **Backend API** | http://localhost:8000 | REST API endpoints |
| 🔧 **Django Admin** | http://localhost:8000/admin/ | Admin panel (admin/admin123) |
| 🗄️ **Database** | localhost:5430 | PostgreSQL instance |

---

## 🔧 Manual Setup (Alternative)

> **Prefer hands-on control? Follow these detailed steps!**

### 📋 Prerequisites for Manual Setup
- 🐍 **Python 3.11+** - [Download Python](https://python.org/downloads/)
- 📦 **Node.js 20+** - [Download Node.js](https://nodejs.org/)
- 🗄️ **PostgreSQL 15+** - [Install PostgreSQL](https://postgresql.org/download/)
- 📦 **Git** - [Install Git](https://git-scm.com/downloads/)

### 📝 Step-by-Step Manual Setup

#### 1️⃣ **Clone the Repository**
```bash
git clone https://github.com/Kbassem10/ImhotepChef.git
cd ImhotepChef
```

#### 2️⃣ **Set Up PostgreSQL Database**
```bash
# 🚀 Start PostgreSQL service
sudo systemctl start postgresql  # Linux
# or
brew services start postgresql   # macOS

# 🗄️ Create database and user
sudo -u postgres psql
CREATE DATABASE imhotepchef_db;
CREATE USER imhotepchef_user WITH PASSWORD 'imhotepchef_password';
GRANT ALL PRIVILEGES ON DATABASE imhotepchef_db TO imhotepchef_user;
\q
```

#### 3️⃣ **Set Up Backend (Django)**
```bash
# 📂 Navigate to backend directory
cd backend/ImhotepChef

# 🐍 Create virtual environment
python -m venv venv

# ⚡ Activate virtual environment
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows

# 📦 Install dependencies
pip install -r requirements.txt

# 🔄 Create environment variables (create .env file)
echo "DEBUG=True
DATABASE_NAME=imhotepchef_db
DATABASE_USER=imhotepchef_user
DATABASE_PASSWORD=imhotepchef_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
SECRET_KEY=your-secret-key-here" > .env

# 🗄️ Run migrations
python manage.py makemigrations
python manage.py migrate

# 👤 Create superuser
python manage.py createsuperuser

# 🚀 Start development server
python manage.py runserver
```

#### 4️⃣ **Set Up Frontend (React)**
```bash
# 🆕 Open new terminal and navigate to frontend directory
cd frontend/ImhotepChef

# 📦 Install dependencies
npm install

# 🌐 Create environment variables (create .env file)
echo "VITE_API_URL=http://localhost:8000" > .env

# 🚀 Start development server
npm run dev
```

#### 5️⃣ **Access the Application**

| Service | URL | Status |
|---------|-----|--------|
| 🎨 **Frontend** | http://localhost:3000 | ✅ Ready |
| ⚡ **Backend API** | http://localhost:8000 | ✅ Ready |
| 🔧 **Django Admin** | http://localhost:8000/admin | ✅ Ready |

### 💻 Manual Development Workflow

**🚀 Starting the application:**
```bash
# Terminal 1 - Backend
cd backend/ImhotepChef
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend  
cd frontend/ImhotepChef
npm run dev
```

**⏹️ Stopping the application:**
- Press `Ctrl+C` in both terminals
- Deactivate virtual environment: `deactivate`

---

## ⚙️ Development

**🔧 Development Mode Features:**
- 🔄 **Hot reloading** for both frontend and backend
- 📁 **Volume mounting** for live code changes  
- 🐛 **Debug mode** enabled
- 🎨 **Live CSS updates** with Tailwind
- ⚡ **Fast refresh** in React

**🛑 Stop the application:**
```bash
docker compose down
```

**📜 View logs:**
```bash
docker compose logs -f
```

**🔄 Rebuild after dependency changes:**
```bash
docker compose up --build
```

---

## 🚨 Troubleshooting

### 🔌 Port Conflicts
> **Issue**: "address already in use" errors

**💡 Solution:**
```bash
# Check what's using the ports
sudo lsof -i :3000  # Frontend port
sudo lsof -i :8000  # Backend port  
sudo lsof -i :5430  # Database port

# Stop conflicting services
sudo systemctl stop postgresql  # Linux
brew services stop postgresql   # macOS
```

### 🛠️ Manual Setup Issues

| Problem | Solution |
|---------|----------|
| 🗄️ **Database connection failed** | Verify PostgreSQL is running & credentials are correct |
| 🐍 **Python import errors** | Ensure virtual environment is activated |
| 📦 **Node.js version issues** | Update to Node.js 20+ |
| 🔐 **Permission denied** | Check file permissions and user access |

### 🐳 Docker Setup Issues

| Problem | Solution |
|---------|----------|
| 🚀 **Container build fails** | Run `docker system prune -a` and retry |
| 🗄️ **Database connection timeout** | Wait for health check to complete |
| 📱 **Frontend not loading** | Check if port 3000 is available |
| ⚡ **Hot reload not working** | Restart container with `docker compose restart` |

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! 

### 🎯 How to Contribute

1. 🍴 **Fork** the repository
2. 🌟 **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. 📝 **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. 📤 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🔄 **Open** a Pull Request

### 🐛 Found a Bug?
Open an issue with:
- 📝 Clear description
- 🔄 Steps to reproduce
- 💻 System information
- 📸 Screenshots (if applicable)

### 💡 Have an Idea?
We'd love to hear it! Open an issue with the `enhancement` label.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Show Your Support

If you find ImhotepChef helpful, please consider:
- ⭐ **Starring** this repository
- 🍴 **Forking** to contribute
- 🐛 **Reporting** issues
- 💡 **Suggesting** new features

---

<div align="center">

**Made with ❤️ by the ImhotepChef Team**

*Happy Coding & Happy Cooking!* 👨‍🍳✨

[⬆ Back to Top](#-imhotepchef)

</div>
