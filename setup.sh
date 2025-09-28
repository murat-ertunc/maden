#!/bin/bash

echo "🚀 Setting up 3D Mining Tunnel Designer..."
echo

# Check if composer exists
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed or not in PATH"
    echo "Please install Composer first: https://getcomposer.org/"
    exit 1
fi

# Check if node exists
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "Please install Node.js first: https://nodejs.org/"
    exit 1
fi

# Check if .env exists, if not copy from example
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your database credentials before running the setup!"
    echo
    read -p "Press enter to continue..."
fi

# Run the setup command
echo "📦 Running project setup..."
php artisan project:setup

echo
echo "🎉 Setup completed!"
echo "💡 You can now start the development server with: php artisan serve"
echo