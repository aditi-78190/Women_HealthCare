#!/bin/bash

# HERA Health App - Quick Setup Script
# This script helps you set up the project

echo "🌸 Welcome to HERA Health App Setup!"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    echo "🚀 To start the development server, run:"
    echo "   npm run dev"
    echo ""
    echo "📦 To build for production, run:"
    echo "   npm run build"
    echo ""
    echo "📖 See README.md for more information"
    echo ""
    echo "✨ Happy coding!"
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
