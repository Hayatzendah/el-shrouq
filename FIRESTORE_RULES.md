# Firestore Security Rules

## Basic Rules (Current)

These rules allow anyone to read data and authenticated users to write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Categories
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Seasons
    match /seasons/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Products
    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## Enhanced Rules with Admin Role (Recommended for Production)

For better security, implement role-based access control:

### Step 1: Create Admins Collection

In Firestore Console, create a collection named `admins` with documents for each admin user:

```
Collection: admins
Document ID: [user_uid_from_firebase_auth]
Fields:
  - email: "admin@el-shrouq.com"
  - role: "admin"
  - createdAt: [timestamp]
```

### Step 2: Apply Enhanced Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    // Categories - Only admins can write
    match /categories/{document} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Seasons - Only admins can write
    match /seasons/{document} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Products - Only admins can write
    match /products/{document} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Admins collection - Only admins can manage
    match /admins/{userId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }
  }
}
```

### Step 3: Add Your First Admin

After setting up Firebase Auth and creating your first user:

1. Copy the user's UID from Firebase Console > Authentication > Users
2. Go to Firestore Console > Create Collection: `admins`
3. Add Document with ID = the user's UID
4. Add fields:
   - `email`: your admin email
   - `role`: "admin"
   - `createdAt`: (current timestamp)

### Step 4: Deploy Rules

1. In Firebase Console, go to Firestore Database > Rules
2. Paste the enhanced rules
3. Click "Publish"

## Testing Rules

Use the Rules Playground in Firebase Console to test your rules:

```javascript
// Test read access (should succeed)
get /databases/(default)/documents/products/test_product

// Test write access without auth (should fail)
create /databases/(default)/documents/products/test_product

// Test write access with admin auth (should succeed)
// Authenticate as admin user first
create /databases/(default)/documents/products/test_product
```

## Monitoring

Enable Firebase Monitoring to track:
- Rule denials
- Unusual access patterns
- Performance metrics

Go to Firebase Console > Firestore > Usage tab to monitor activity.

## Best Practices

1. **Never allow unrestricted write access in production**
2. **Always validate data on the backend**
3. **Use security rules for authentication, not authorization logic**
4. **Regularly audit admin access**
5. **Monitor Firestore usage and costs**
6. **Test rules thoroughly before deploying**

## Common Issues

### Issue: "Missing or insufficient permissions"
**Solution**: Check that:
- User is authenticated
- User's UID exists in `admins` collection
- Rules are deployed correctly

### Issue: Rules don't update immediately
**Solution**: Wait 1-2 minutes after publishing rules for changes to propagate

### Issue: Can't read data after adding admin rules
**Solution**: Read access should still be public (`allow read: if true`). Check that you didn't accidentally restrict read access.
