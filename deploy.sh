#!/bin/bash

# AutoService Houte - Railway Deployment Script

echo "🚀 AutoService Houte - Railway Deployment"
echo "=========================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

echo "✅ Prerequisites checked"
echo ""
echo "📋 Deployment Steps:"
echo ""
echo "1️⃣  Login to Railway:"
echo "   railway login"
echo ""
echo "2️⃣  Initialize project:"
echo "   railway init"
echo ""
echo "3️⃣  Deploy:"
echo "   railway up"
echo ""
echo "4️⃣  Set environment variables:"
echo "   railway variables set EMAIL_USER=your-email@gmail.com"
echo "   railway variables set EMAIL_PASS=your-app-password"
echo ""
echo "5️⃣  Get your domain:"
echo "   railway domain"
echo ""
echo "6️⃣  Configure frontend API URL via environment variable"
echo "   Create .env.production with:"
echo "   VITE_API_BASE_URL=https://your-app-name.up.railway.app/api"
echo "   (or set this variable in your frontend host build settings)"
echo ""
echo "7️⃣  Build and deploy frontend:"
echo "   npm run build"
echo "   git add ."
echo "   git commit -m 'Deploy to Railway'"
echo "   git push origin main"
echo ""
echo "✨ Your app will be live at:"
echo "   Backend: https://your-app.railway.app"
echo "   Frontend: https://m3hmet072.github.io/AutoServiceHoute/"
echo ""
echo "🔗 Useful links:"
echo "   Railway Dashboard: https://railway.app/dashboard"
echo "   Railway Docs: https://docs.railway.app"
echo ""
