# ImhotepChef

A modern recipe management application built with Django REST Framework and React.

## Quick Start for Contributors

### Prerequisites
- Docker and Docker Compose installed on your machine
- Git

### Setup (One Command!)

1. Clone the repository:
```bash
git clone https://github.com/Imhotep-Tech/ImhotepChef.git
cd ImhotepChef
```

2. Run the application:
```bash
docker compose up --build
```

That's it! 🎉

### What this does:
- Sets up a PostgreSQL database (on port 5433 to avoid conflicts)
- Builds and runs the Django backend on http://localhost:8000
- Builds and runs the React frontend on http://localhost:3000
- Creates a superuser with Credentials: (username: admin/ Password: admin123) for Django admin
- Handles all database migrations automatically

### Access Points:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin/ Credentials: (username: admin/ Password: admin123)
- **Database**: localhost:5433 (PostgreSQL)

## Manual Setup (Alternative)

If you prefer to run the application manually without Docker:

### Prerequisites for Manual Setup
- Python 3.11+ and pip
- Node.js 20+ and npm
- PostgreSQL 15+
- Git

### Step-by-Step Manual Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd ImhotepChef
```

#### 2. Set Up PostgreSQL Database
```bash
# Start PostgreSQL service
sudo systemctl start postgresql  # Linux
# or
brew services start postgresql   # macOS

# Create database and user
sudo -u postgres psql
CREATE DATABASE imhotepchef;
CREATE USER imhotepchef_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE imhotepchef TO imhotepchef_user;
\q
```

#### 3. Set Up Backend (Django)
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env  # Copy example env file
# Edit .env file with your database credentials:
# DB_NAME=imhotepchef
# DB_USER=imhotepchef_user
# DB_PASSWORD=your_password
# DB_HOST=localhost
# DB_PORT=5432

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

#### 4. Set Up Frontend (React)
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Django Admin**: http://localhost:8000/admin

### Manual Development Workflow

**Starting the application:**
```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**Stopping the application:**
- Press `Ctrl+C` in both terminals
- Deactivate virtual environment: `deactivate`

### Development

The application runs in development mode with:
- Hot reloading for both frontend and backend
- Volume mounting for live code changes
- Debug mode enabled

To stop the application:
```bash
docker-compose down
```

To view logs:
```bash
docker-compose logs -f
```

To rebuild after dependency changes:
```bash
docker-compose up --build
```

### Troubleshooting

**Port conflicts:**
- If you see "address already in use" errors, make sure no other services are running on ports 3000, 8000, or 5430
- To stop local PostgreSQL: `sudo systemctl stop postgresql` (Linux) or `brew services stop postgresql` (macOS)

**Manual setup issues:**
- Make sure PostgreSQL is running and accessible
- Verify database credentials in your .env file
- Check that Python virtual environment is activated
- Ensure Node.js version is 20 or higher

**Docker setup issues:**
- The frontend uses Node 20 for better compatibility with modern packages
- Database runs on port 5430 to avoid conflicts with local PostgreSQL
