# Firestore Security Rules Documentation

## Overview

This document explains the Firestore security rules implemented for the MicroFinance application. The rules ensure that users can only access their own data while maintaining proper security.

## Security Rules Structure

### 🔐 Authentication Rules

```javascript
// Check if user is authenticated
function isAuthenticated() {
  return request.auth != null;
}

// Check if user owns the data
function isOwner(userId) {
  return isAuthenticated() && request.auth.uid == userId;
}

// Check if user is admin
function isAdmin() {
  return isAuthenticated() && request.auth.token.admin == true;
}
```

### 📁 Data Access Patterns

#### User-Specific Collections
- **Path**: `users/{userId}/transactions/{transactionId}`
- **Access**: Only the owner (userId) can read/write
- **Example**: User can only access their own transactions

#### Global Collections (Admin Only)
- **Path**: `transactions/{transactionId}`
- **Access**: Only admins can read/write
- **Example**: Admin can view all transactions across users

#### Public Collections
- **Path**: `blogs/{blogId}`
- **Access**: Authenticated users can read, admins can write
- **Example**: Users can read blog posts, only admins can create/edit

## 🔒 Security Features

### 1. User Data Isolation
- Each user can only access their own data
- Data is organized under `users/{userId}/` subcollections
- Prevents cross-user data access

### 2. Input Validation
```javascript
function isValidTransaction() {
  return request.resource.data.keys().hasAll(['amount', 'type', 'category', 'date', 'userId']);
}
```

### 3. Role-Based Access
- **Regular Users**: Can access their own data
- **Admins**: Can access all data
- **Support**: Can access tickets they're assigned to

### 4. Support Ticket Security
- Users can only access their own tickets
- Assigned support staff can access assigned tickets
- Admins can access all tickets

## 📊 Collections Covered

### User-Specific Collections
- ✅ `users/{userId}/transactions`
- ✅ `users/{userId}/loans`
- ✅ `users/{userId}/invoices`
- ✅ `users/{userId}/clients`
- ✅ `users/{userId}/analytics`
- ✅ `users/{userId}/financial_reports`
- ✅ `users/{userId}/payments`
- ✅ `users/{userId}/dashboard_data`
- ✅ `users/{userId}/kpi_data`
- ✅ `users/{userId}/charts_data`
- ✅ `users/{userId}/business_profile`
- ✅ `users/{userId}/account_settings`
- ✅ `users/{userId}/system_preferences`
- ✅ `users/{userId}/logs`

### Global Collections
- ✅ `transactions`
- ✅ `loans`
- ✅ `invoices`
- ✅ `clients`
- ✅ `business_profiles`
- ✅ `analytics`
- ✅ `financial_reports`
- ✅ `payments`
- ✅ `dashboard_data`
- ✅ `kpi_data`
- ✅ `charts_data`
- ✅ `account_settings`
- ✅ `system_preferences`

### Public Collections
- ✅ `tickets`
- ✅ `blogs`
- ✅ `reviews`
- ✅ `testimonials`
- ✅ `events`
- ✅ `notifications`
- ✅ `config`
- ✅ `settings`
- ✅ `contactUS`

## 🚀 Deployment

### Deploy Rules Only
```bash
firebase deploy --only firestore:rules
```

### Deploy Indexes Only
```bash
firebase deploy --only firestore:indexes
```

### Deploy Both
```bash
firebase deploy --only firestore
```

### Windows Batch Script
```bash
deploy-rules.bat
```

### PowerShell Script
```powershell
deploy-rules.ps1
```

## 🔍 Testing Rules

### Test User Access
```javascript
// Test if user can read their own transactions
const userTransactions = await getDocs(
  query(collection(db, `users/${userId}/transactions`))
);
```

### Test Admin Access
```javascript
// Test if admin can read all transactions
const allTransactions = await getDocs(
  query(collection(db, 'transactions'))
);
```

## ⚠️ Common Issues

### 1. "Missing or insufficient permissions"
- **Cause**: User not authenticated or trying to access other user's data
- **Solution**: Ensure user is logged in and accessing their own data

### 2. "Document does not exist"
- **Cause**: Trying to read a document that hasn't been created
- **Solution**: Use `setDoc` for initial document creation

### 3. "Invalid document reference"
- **Cause**: Document path has odd number of segments
- **Solution**: Ensure document paths have even number of segments

## 📈 Performance Indexes

The following indexes are created for optimal query performance:

1. **Transactions**: `userId + date` (descending)
2. **Transactions**: `userId + type + date` (descending)
3. **Transactions**: `userId + category + date` (descending)
4. **Loans**: `userId + status + createdAt` (descending)
5. **Invoices**: `userId + status + dueDate` (ascending)
6. **Clients**: `userId + name` (ascending)
7. **Charts Data**: `userId + createdAt` (descending)
8. **Tickets**: `userId + status + createdAt` (descending)
9. **Tickets**: `assignedTo + status + createdAt` (descending)

## 🔧 Customization

### Add New Collection
1. Add collection rules to `firestore.rules`
2. Add validation function if needed
3. Deploy rules: `firebase deploy --only firestore:rules`

### Add New Index
1. Add index to `firestore.indexes.json`
2. Deploy indexes: `firebase deploy --only firestore:indexes`

### Modify Access Rules
1. Update rules in `firestore.rules`
2. Test locally with Firebase Emulator
3. Deploy to production

## 📞 Support

For issues with security rules:
1. Check Firebase Console for error details
2. Verify user authentication status
3. Ensure data paths are correct
4. Test with Firebase Emulator locally

## 🔐 Best Practices

1. **Always validate input data**
2. **Use specific field validation**
3. **Implement proper error handling**
4. **Test rules thoroughly before deployment**
5. **Monitor access patterns in Firebase Console**
6. **Regularly review and update rules**
7. **Use least privilege principle**
8. **Document all rule changes**

---

**Last Updated**: July 2024
**Version**: 1.0.0
**Firebase Project**: microfin-d2f96 