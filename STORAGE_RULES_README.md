# Firebase Storage Security Rules

This document explains the Firebase Storage security rules for the MicroFin loan application system.

## 📁 File Structure

The storage rules are organized by file type and user access:

### Loan Application Documents
- **Path**: `loan-applications/{userId}/{fileName}`
- **Access**: Users can only access their own documents
- **File Types**: PDF, DOC, DOCX, JPG, PNG
- **Size Limit**: 10MB

### Profile Images
- **Path**: `images/profile/{userId}/{fileName}`
- **Access**: Users can only access their own profile images
- **File Types**: JPG, PNG, GIF, WebP
- **Size Limit**: 5MB

### Chat Files
- **Path**: `chats/{userId}/files/{fileName}`
- **Access**: Users can only access their own chat files
- **File Types**: Images, PDFs, Documents, Audio, Video
- **Size Limit**: 50MB

### Blog Images
- **Path**: `blogs/{fileName}`
- **Access**: Public read, authenticated write
- **File Types**: Images only
- **Size Limit**: 5MB

### Template Files
- **Path**: `files/templates/{templateId}/{fileName}`
- **Access**: Authenticated users only
- **File Types**: PDF, DOC, DOCX, TXT, RTF
- **Size Limit**: 20MB

## 🔒 Security Features

### Authentication
- All write operations require user authentication
- Users can only access their own files
- Public read access for blog and carousel images

### File Validation
- **File Type Validation**: Only allowed file types can be uploaded
- **File Size Limits**: Prevents large file uploads
- **File Name Validation**: Ensures safe file names
- **Content Type Validation**: Matches file extension with content type

### Size Limits
- **Loan Documents**: 10MB
- **Profile Images**: 5MB
- **Chat Files**: 50MB
- **Blog Images**: 5MB
- **Template Files**: 20MB

## 🚀 Deployment

### Prerequisites
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

### Deploy Rules

#### Using the Script (Recommended)
```bash
# Linux/Mac
chmod +x deploy-storage-rules.sh
./deploy-storage-rules.sh

# Windows
deploy-storage-rules.bat
```

#### Manual Deployment
```bash
firebase deploy --only storage
```

## 📋 Rule Breakdown

### Loan Application Documents
```javascript
match /loan-applications/{userId}/{fileName} {
  allow read, write: if request.auth != null 
    && request.auth.uid == userId
    && validateLoanDocument(fileName);
}
```

**Features:**
- ✅ User authentication required
- ✅ Users can only access their own files
- ✅ File type and size validation
- ✅ Safe file naming

### Validation Functions

#### Loan Document Validation
```javascript
function validateLoanDocument(fileName) {
  return fileName.matches('^[a-zA-Z0-9_-]+\\.(pdf|doc|docx|jpg|jpeg|png)$')
    && request.resource.size < 10 * 1024 * 1024 // 10MB limit
    && request.resource.contentType.matches('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document|image/jpeg|image/png');
}
```

#### Image File Validation
```javascript
function validateImageFile(fileName) {
  return fileName.matches('^[a-zA-Z0-9_-]+\\.(jpg|jpeg|png|gif|webp)$')
    && request.resource.size < 5 * 1024 * 1024 // 5MB limit
    && request.resource.contentType.matches('image/.*');
}
```

## 🛡️ Security Benefits

1. **Prevents Unauthorized Access**: Users can only access their own files
2. **File Type Security**: Only allowed file types can be uploaded
3. **Size Protection**: Prevents large file uploads that could impact performance
4. **Content Validation**: Ensures file content matches the file extension
5. **Safe File Names**: Prevents malicious file names
6. **Authentication Required**: All uploads require user authentication

## 🔧 Customization

### Adding New File Types
1. Update the validation function for the relevant path
2. Add the new file extension to the regex pattern
3. Add the content type to the contentType validation

### Changing Size Limits
Modify the size limit in the validation function:
```javascript
&& request.resource.size < 10 * 1024 * 1024 // Change 10 to desired MB
```

### Adding New Paths
1. Add a new match rule for the path
2. Create a validation function if needed
3. Define access rules based on your requirements

## 🚨 Important Notes

1. **Test Rules**: Always test rules in Firebase Console before deploying
2. **Backup**: Keep a backup of your current rules before updating
3. **Monitor**: Check Firebase Console for any rule violations
4. **Update**: Regularly review and update rules as your app evolves

## 📞 Support

If you encounter issues with the storage rules:
1. Check Firebase Console for error messages
2. Verify your Firebase project configuration
3. Test rules in Firebase Console's Rules Playground
4. Review the Firebase Storage documentation 