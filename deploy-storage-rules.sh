#!/bin/bash

# Firebase Storage Rules Deployment Script
# This script deploys the storage rules to Firebase

echo "🚀 Deploying Firebase Storage Rules..."

# Check if firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ You are not logged in to Firebase. Please login first:"
    echo "firebase login"
    exit 1
fi

# Deploy storage rules
echo "📤 Uploading storage rules..."
firebase deploy --only storage

if [ $? -eq 0 ]; then
    echo "✅ Storage rules deployed successfully!"
    echo "🔒 Your Firebase Storage is now secured with the new rules."
else
    echo "❌ Failed to deploy storage rules. Please check your Firebase configuration."
    exit 1
fi 