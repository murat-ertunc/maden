@echo off
echo 🚀 Setting up 3D Mining Tunnel Designer...
echo.

:: Check if composer exists
where composer >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Composer is not installed or not in PATH
    echo Please install Composer first: https://getcomposer.org/
    pause
    exit /b 1
)

:: Check if node exists
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js first: https://nodejs.org/
    pause
    exit /b 1
)

:: Check if .env exists, if not copy from example
if not exist .env (
    echo 📝 Creating .env file from .env.example...
    copy .env.example .env
    echo ⚠️  Please edit .env file with your database credentials before running the setup!
    echo.
    pause
)

:: Run the setup command
echo 📦 Running project setup...
php artisan project:setup

echo.
echo 🎉 Setup completed!
echo 💡 You can now start the development server with: php artisan serve
echo.
pause