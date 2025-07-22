@echo off
REM Firebase Storage Rules Deployment Script for Windows
REM This script deploys the storage rules to Firebase

echo 🚀 Deploying Firebase Storage Rules...

REM Check if firebase CLI is installed
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Firebase CLI is not installed. Please install it first:
    echo npm install -g firebase-tools
    pause
    exit /b 1
)

REM Check if user is logged in
firebase projects:list >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ You are not logged in to Firebase. Please login first:
    echo firebase login
    pause
    exit /b 1
)

REM Deploy storage rules
echo 📤 Uploading storage rules...
firebase deploy --only storage

if %errorlevel% equ 0 (
    echo ✅ Storage rules deployed successfully!
    echo 🔒 Your Firebase Storage is now secured with the new rules.
) else (
    echo ❌ Failed to deploy storage rules. Please check your Firebase configuration.
    pause
    exit /b 1
)

pause 