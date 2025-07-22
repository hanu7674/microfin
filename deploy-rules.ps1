Write-Host "Deploying Firestore security rules..." -ForegroundColor Green
firebase deploy --only firestore:rules
Write-Host "Rules deployed successfully!" -ForegroundColor Green
Read-Host "Press Enter to continue" 