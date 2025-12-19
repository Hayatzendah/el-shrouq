# ⚠️ Important Notes & Setup Instructions

## 🔴 CRITICAL - Must Do Before Using

### 1. Update Firebase Configuration (REQUIRED)

The `.env.local` file currently has placeholder values. You **MUST** update it with your actual Firebase Web App credentials:

**Current `.env.local` has:**
```env
NEXT_PUBLIC_FIREBASE_APP_ID=1:712050151511:web:your-app-id-here  # ← CHANGE THIS!
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mahmoudappbackend.firebaseapp.com  # ← VERIFY THIS!
```

**How to get the correct values:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Open your project: `mahmoudappbackend`
3. Click ⚙️ Settings > Project Settings
4. Scroll to "Your apps" section
5. If you haven't added a Web app yet:
   - Click the Web icon (</>)
   - Register app with nickname "el-shrouq-web"
   - Copy ALL the config values
6. Update `.env.local` with the exact values from Firebase

### 2. Create Your First Admin User (REQUIRED)

Before you can use the admin dashboard, you need at least one admin user:

1. Go to Firebase Console > Authentication
2. Click "Add user" button
3. Enter your admin email and password
   - Example: `admin@el-shrouq.com` / `YourStrongPassword123`
4. Save the credentials securely

**You'll use these to login at `/admin/login`**

### 3. Set Firestore Security Rules (REQUIRED)

**Default rules (for testing):**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**⚠️ WARNING**: These rules allow ANY authenticated user to write to your database. This is fine for testing with a single admin, but for production, implement role-based access (see `FIRESTORE_RULES.md`).

### 4. Verify Firestore is Enabled

1. Firebase Console > Firestore Database
2. If you see "Get started", click it and create database
3. Choose "Production mode"
4. Select a location close to your users (e.g., europe-west for Europe)

---

## 🎯 First-Time Setup Checklist

Run through this checklist in order:

- [ ] Install dependencies: `npm install`
- [ ] Update `.env.local` with real Firebase credentials
- [ ] Enable Firestore Database in Firebase Console
- [ ] Set Firestore security rules
- [ ] Enable Firebase Authentication (Email/Password)
- [ ] Create your first admin user in Firebase Auth
- [ ] Start dev server: `npm run dev`
- [ ] Visit `http://localhost:3000/admin/login`
- [ ] Login with admin credentials
- [ ] Click "Seed Database" button on dashboard
- [ ] Verify products appear at `http://localhost:3000/products`

---

## 📝 Important File Locations

### Environment Variables
- **Location**: `/.env.local` (in project root)
- **Gitignored**: YES (never commit this file)
- **Example**: `.env.example` (template file)

### Images
- **Location**: `/public/images/`
- **Subfolders**:
  - `/home/` - Homepage images
  - `/about/` - About page images
  - `/products/` - Product detail images
  - `/contact/` - Contact page images
- **Total**: 38 images included

### Brand Colors
- **Defined in**: `tailwind.config.ts` and `styles/globals.css`
- **Used throughout**: All components reference these colors

---

## 🚨 Common Mistakes to Avoid

### 1. Don't Commit `.env.local`
✅ `.env.local` is already in `.gitignore`
❌ NEVER commit Firebase credentials to GitHub

### 2. Don't Skip Firebase Setup
❌ Won't work without proper Firebase configuration
✅ Follow steps in QUICKSTART.md carefully

### 3. Don't Forget to Create Admin User
❌ Can't login without an admin user in Firebase Auth
✅ Create user BEFORE trying to login

### 4. Don't Use Weak Passwords
❌ Password: "123456"
✅ Password: "StrongP@ssw0rd2024!"

### 5. Don't Skip Security Rules
❌ Leaving rules as "allow read, write: if true"
✅ Set proper rules (see FIRESTORE_RULES.md)

---

## 🔒 Security Best Practices

### For Development
- ✅ Current rules are fine (authenticated write)
- ✅ Only create 1-2 admin users
- ✅ Use strong passwords

### For Production
- ⚠️ Implement role-based access (see FIRESTORE_RULES.md)
- ⚠️ Create `admins` collection in Firestore
- ⚠️ Add admin UIDs to that collection
- ⚠️ Update security rules to check admin role

---

## 📱 Contact Form Configuration

The contact form uses **Formspree** with endpoint:
```
https://formspree.io/f/xeoyyyzv
```

**If you want to use your own Formspree:**
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Get your form endpoint (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
4. Update in `app/contact/page.tsx`:
   ```tsx
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

**Current endpoint may send emails to the original developer.** Change it to your own!

---

## 🎨 Customization Guide

### Change Logo
1. Replace `/public/images/home/logo-elshrouq.jpg`
2. Keep same filename OR update in:
   - `components/Header.tsx`
   - `app/admin/login/page.tsx`

### Change Brand Colors
1. Edit `tailwind.config.ts`:
   ```typescript
   colors: {
     brand: {
       teal: '#YOUR_COLOR',
       orange: '#YOUR_COLOR',
       // ...
     }
   }
   ```
2. Edit `styles/globals.css`:
   ```css
   :root {
     --brand-teal: #YOUR_COLOR;
     // ...
   }
   ```

### Change Company Info
Update in:
- `components/Footer.tsx` - Footer contact info
- `app/contact/page.tsx` - Contact page info
- `README.md` - Documentation

### Add More Categories
1. Edit `lib/seedData.ts` to add new categories
2. Update `lib/types.ts` to include new category name in type
3. Add color in `lib/utils.ts` color maps

---

## 🚀 Deployment Reminders

### Before Deploying

- [ ] Test build locally: `npm run build`
- [ ] Verify all images load
- [ ] Test admin login works
- [ ] Test contact form sends emails
- [ ] Test mobile responsive design
- [ ] Update environment variables in hosting platform
- [ ] Set production Firebase security rules

### After Deploying

- [ ] Test live site URL
- [ ] Create test product in admin
- [ ] Verify it appears on public site
- [ ] Test contact form on live site
- [ ] Check Firebase usage/billing
- [ ] Add custom domain (optional)
- [ ] Enable SSL certificate

---

## 📊 Firebase Costs (Free Tier Limits)

**Firestore**
- Reads: 50,000/day
- Writes: 20,000/day
- Deletes: 20,000/day

**Authentication**
- Phone auth: 10,000/month
- Email auth: Unlimited

**Typical small site usage**: Well within free tier!

**Monitor usage**: Firebase Console > Usage tab

---

## 🔧 Development Tools

### Useful Commands
```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Check code quality

# Clear cache
rm -rf .next node_modules
npm install
```

### VS Code Extensions (Recommended)
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Firebase Explorer
- Error Lens
- Prettier

---

## 📞 Support & Resources

### Documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup (5 mins)
- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [FIRESTORE_RULES.md](FIRESTORE_RULES.md) - Security setup
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Feature list

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Get Help
- **Email**: info@el-shrouq.com
- **Phone**: +20 1023498590
- **WhatsApp**: +20 1034490529

---

## ✅ Final Checklist Before Going Live

- [ ] Firebase credentials updated in `.env.local`
- [ ] Admin user created in Firebase Auth
- [ ] Firestore security rules set
- [ ] Seed database clicked (sample data loaded)
- [ ] All pages tested (Home, About, Products, Contact, Admin)
- [ ] Contact form tested (email received)
- [ ] Images loading correctly
- [ ] Mobile responsive verified
- [ ] Build succeeds: `npm run build`
- [ ] Production environment variables set on hosting platform
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active

---

**Once you complete this checklist, your site is ready for production! 🎉**

Good luck with your EL SHROUQ Export website!
