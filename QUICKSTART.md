# Quick Start Guide - EL SHROUQ Export Website

## ⚡ 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Firebase

#### Create `.env.local` file:
```bash
cp .env.example .env.local
```

#### Get Firebase credentials:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create new one)
3. Click ⚙️ Settings > Project Settings
4. Scroll to "Your apps" > Click Web icon (</>)
5. Copy the config values to `.env.local`

### 3. Setup Firestore

#### Enable Firestore:
1. Firebase Console > Firestore Database
2. Click "Create database"
3. Choose "Production mode"
4. Select location

#### Set Security Rules:
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

### 4. Enable Authentication
1. Firebase Console > Authentication
2. Click "Get started"
3. Enable "Email/Password"
4. Add your admin user (Users tab > Add user)

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 6. Login to Admin & Seed Data
1. Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with the admin credentials you created
3. Click "Seed Database" button
4. Done! Your site now has sample products

---

## 📁 Project Structure Quick Reference

```
📦 el-shrouq/
├── 🌐 app/                 # Pages
│   ├── page.tsx           # Home
│   ├── about/             # About page
│   ├── products/          # Products listing & details
│   ├── contact/           # Contact form
│   └── admin/             # Admin dashboard
├── 🧩 components/         # Reusable components
├── 📚 lib/                # Firebase & utilities
├── 🎨 styles/             # Global styles
└── 🖼️ public/images/      # Static images
```

## 🎯 Key Features Overview

### Public Website
- ✅ Home with hero, categories, quality showcase
- ✅ About page (Arabic + English)
- ✅ Products with filters, search, season tabs
- ✅ Product details with image galleries
- ✅ Contact form (Formspree)

### Admin Dashboard
- ✅ Secure login (Firebase Auth)
- ✅ Manage Products (CRUD + visibility)
- ✅ Manage Seasons (CRUD + visibility)
- ✅ Manage Categories (CRUD + visibility)
- ✅ One-click seed data

## 🎨 Brand Colors

```css
Primary (Teal):    #254551
Secondary (Orange): #CB6A0F
Accent (Gold):     #D79B3F
Support (Green):   #465C1B
```

## 📱 Test on Mobile

```bash
# Find your local IP
# Windows: ipconfig
# Mac/Linux: ifconfig

# Access from phone on same network:
# http://YOUR_IP:3000
```

## 🚀 Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git push origin main

# 2. Import to Vercel
# - Visit vercel.com
# - Import GitHub repo
# - Add environment variables from .env.local
# - Deploy!
```

## 🔍 Common Tasks

### Add New Product (Admin)
1. Login to `/admin`
2. Products → Add Product
3. Fill form, select category + seasons
4. Save

### Change Product Visibility
1. Products page in admin
2. Click 👁️ icon to toggle

### Modify Brand Colors
Edit `tailwind.config.ts` and `styles/globals.css`

### Change Contact Email
Update Formspree action in `app/contact/page.tsx`

## 🐛 Troubleshooting

### Firebase Not Connecting
- Check `.env.local` values
- Verify Firestore is enabled
- Check security rules

### Can't Login to Admin
- Verify user exists in Firebase Auth
- Check email/password are correct
- Clear browser cache

### Images Not Loading
- Check file paths in `/public/images/`
- Verify filenames match (case-sensitive)
- Restart dev server

### Build Errors
```bash
rm -rf .next node_modules
npm install
npm run build
```

## 📚 Learn More

- [Full README](README.md) - Complete documentation
- [Firestore Rules](FIRESTORE_RULES.md) - Security setup
- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Docs](https://firebase.google.com/docs)

## 🆘 Need Help?

**Email**: info@el-shrouq.com
**Phone**: +20 1023498590

---

**Made with ❤️ using Next.js + Firebase**
