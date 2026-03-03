#!/bin/bash

# GitHub deployment
echo "🚀 Deploying to GitHub..."

# Add remote and push
cd C:/Users/devpi/.openclaw/workspace/waitlist-pro

git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/openclaw/openclaw-setup-service.git
git branch -M main

# Push code
echo "📤 Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Code pushed to GitHub successfully!"
    echo "🚀 Repository: https://github.com/openclaw/openclaw-setup-service"
else
    echo "❌ Failed to push to GitHub"
    echo "💡 You may need to create the repository first at: https://github.com/new"
    echo "   Repository name: openclaw-setup-service"
fi

echo ""
echo "🚀 NEXT: Deploy to Vercel"
echo "1. Go to https://vercel.com"
echo "2. Click 'Import GitHub'"
echo "3. Select: openclaw-setup-service"
echo "4. Click 'Deploy'"
echo ""
echo "🎯 Your site will be: https://openclaw-setup-service.vercel.app"
