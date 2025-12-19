# EL SHROUQ Import & Export | Egyptian Produce Export

A modern, full-featured website for **EL SHROUQ Import & Export** - a premium Egyptian agricultural products exporter. Built with Next.js, TypeScript, TailwindCSS, and Firebase.

## 🌟 Features

### Public Website
- **Home Page**: Hero section, product categories, quality features, and CTA banner
- **About Page**: Company story (Arabic), vision/mission/values, facilities showcase
- **Products Page**: Filterable products with season tabs, category filters, and search
- **Product Details**: Individual product pages with galleries and request quote functionality
- **Contact Page**: Multiple contact methods and Formspree-integrated contact form

### Admin Dashboard
- **Secure Authentication**: Firebase Auth with protected routes
- **Products Manager**: Full CRUD operations with visibility toggle
- **Seasons Manager**: Manage seasonal availability with custom date ranges
- **Categories Manager**: Control product categories and brand colors
- **Dashboard Overview**: Statistics and quick actions
- **Seed Database**: One-click sample data population

### Design Features
- ✨ Smooth animations with Framer Motion
- 📱 Fully responsive (mobile-first)
- 🎨 Brand-consistent color system
- 🔄 RTL support ready
- 🎯 Soft cards with rounded corners
- 💎 Category chips with custom colors
- 🖼️ Next.js Image optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Backend**: Firebase (Firestore + Auth)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: Formspree

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase project (see Firebase Setup below)

### Steps

1. **Clone or download the project**
   ```bash
   cd el-shrouq
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Firestore Database and Authentication

### 2. Get Web App Configuration
1. In Firebase Console, go to Project Settings > General
2. Scroll to "Your apps" section
3. Click the Web icon (</>)
4. Register your app and copy the configuration values
5. Add these values to your `.env.local` file

### 3. Enable Authentication
1. Go to Firebase Console > Authentication
2. Click "Get Started"
3. Enable "Email/Password" sign-in method
4. Create your first admin user:
   - Go to "Users" tab
   - Click "Add User"
   - Enter email and password

### 4. Configure Firestore Database
1. Go to Firebase Console > Firestore Database
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users

### 5. Set Firestore Security Rules

Go to Firestore Database > Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all public collections
    match /categories/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /seasons/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /products/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Security Note**: The current rules allow any authenticated user to write. For production, implement role-based access control:

```javascript
// Example: Role-based rules (requires additional setup)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null &&
             exists(/databases/$(database)/documents/admins/$(request.auth.uid));
    }

    match /categories/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /seasons/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /products/{document} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // Admins collection
    match /admins/{userId} {
      allow read, write: if isAdmin();
    }
  }
}
```

### 6. Seed Initial Data
1. Login to admin dashboard at `/admin/login`
2. Click "Seed Database" button on the dashboard
3. This will create:
   - 5 categories (Vegetables, Fruits, Citrus, Berries, Frozen)
   - 5 seasons (Winter, Spring, Summer, Autumn, All Year)
   - 10 sample products

## 📊 Data Model

### Collections

#### `categories`
```typescript
{
  id: string;
  name: 'Vegetables' | 'Fruits' | 'Citrus' | 'Berries' | 'Frozen';
  slug: string;
  order: number;
  isVisible: boolean;
  colorHex: string;
}
```

#### `seasons`
```typescript
{
  id: string;
  name: string;
  slug: string;
  order: number;
  isVisible: boolean;
  startMonth?: number; // 1-12
  endMonth?: number;   // 1-12
}
```

#### `products`
```typescript
{
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  seasonIds: string[];
  shortDesc: string;
  varieties?: string[];
  image: string;
  gallery?: string[];
  isVisible: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Product Visibility Logic

A product is visible on the public website only if:
1. `product.isVisible === true`
2. At least one season in `product.seasonIds` has `isVisible === true`
3. The product's category has `isVisible === true`

## 🎨 Brand Colors

The project uses the official EL SHROUQ brand colors:

```css
--brand-teal: #254551     /* Primary - Headers, Titles */
--brand-orange: #CB6A0F   /* Secondary - CTAs, Highlights */
--brand-gold: #D79B3F     /* Accent - Premium touches */
--brand-green: #465C1B    /* Support - Vegetables, Success */
--bg-soft: #DEE8EB        /* Soft background */
--border: #C1C2B8         /* Borders, Dividers */
--text: #556970           /* Body text */
--muted: #86979C          /* Muted text */
```

### Category Colors
- **Vegetables**: `#465C1B` (Brand Green)
- **Fruits**: `#CB6A0F` (Brand Orange)
- **Citrus**: `#D79B3F` (Brand Gold)
- **Frozen**: `#254551` (Brand Teal)
- **Berries**: `#6B5B95` (Purple)

## 📁 Project Structure

```
el-shrouq/
├── app/
│   ├── layout.tsx           # Root layout with Header/Footer
│   ├── page.tsx             # Home page
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── products/
│   │   ├── page.tsx        # Products listing with filters
│   │   └── [slug]/
│   │       └── page.tsx    # Product detail page
│   ├── contact/
│   │   └── page.tsx        # Contact page with form
│   └── admin/
│       ├── layout.tsx      # Admin layout with sidebar
│       ├── login/
│       │   └── page.tsx    # Admin login
│       ├── page.tsx        # Admin dashboard
│       ├── products/
│       │   └── page.tsx    # Products manager
│       ├── seasons/
│       │   └── page.tsx    # Seasons manager
│       └── categories/
│           └── page.tsx    # Categories manager
├── components/
│   ├── Header.tsx          # Site header with navigation
│   ├── Footer.tsx          # Site footer
│   ├── ProductCard.tsx     # Product display card
│   ├── AdminGuard.tsx      # Auth protection wrapper
│   └── SeedButton.tsx      # Database seed button
├── lib/
│   ├── types.ts            # TypeScript interfaces
│   ├── firebaseClient.ts   # Firebase initialization
│   ├── firestore.ts        # Firestore CRUD functions
│   ├── auth.ts             # Authentication functions
│   ├── utils.ts            # Utility functions
│   └── seedData.ts         # Sample data seeder
├── styles/
│   └── globals.css         # Global styles & Tailwind
├── public/
│   └── images/
│       ├── home/           # Home page images
│       ├── about/          # About page images
│       ├── products/       # Product images
│       └── contact/        # Contact page images
├── .env.local              # Environment variables (not in git)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🚀 Deployment

### Hostinger (Node.js)

This is a **Node.js application** built with Next.js. Hostinger will automatically detect it as a Node.js project.

**Requirements:**
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

**Deployment Steps:**
1. Connect your GitHub repository to Hostinger
2. Select the `el-shrouq` repository
3. Hostinger will automatically detect it as a Node.js project (via `package.json`, `server.js`, and `Procfile`)
4. Set environment variables in Hostinger dashboard:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```
5. Build command: `npm run build`
6. Start command: `npm start`
7. Port: `3000` (or use Hostinger's assigned port via `PORT` environment variable)

**Note:** The project includes `server.js`, `Procfile`, and proper `package.json` configuration to ensure Hostinger recognizes it as a Node.js application.

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## 🔐 Admin Access

1. **Login**: Navigate to `/admin/login`
2. **Credentials**: Use the email/password you created in Firebase Authentication
3. **Dashboard**: After login, you'll see the admin dashboard at `/admin`

### Admin Features

- **Dashboard** (`/admin`): Overview with stats and quick actions
- **Products** (`/admin/products`): Add, edit, delete, and toggle visibility
- **Seasons** (`/admin/seasons`): Manage seasonal availability
- **Categories** (`/admin/categories`): Control product categories

## 📧 Contact Form Setup

The contact form uses [Formspree](https://formspree.io) with endpoint: `https://formspree.io/f/xeoyyyzv`

To use your own Formspree endpoint:
1. Sign up at [Formspree](https://formspree.io)
2. Create a new form
3. Update the form action in `app/contact/page.tsx`:
   ```tsx
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🌐 Available Routes

### Public Routes
- `/` - Home
- `/about` - About Us
- `/products` - Products Listing
- `/products/[slug]` - Product Details
- `/contact` - Contact Us

### Admin Routes (Protected)
- `/admin/login` - Admin Login
- `/admin` - Dashboard
- `/admin/products` - Products Manager
- `/admin/seasons` - Seasons Manager
- `/admin/categories` - Categories Manager

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components adapt gracefully to different screen sizes with mobile-first approach.

## ⚡ Performance

- Next.js Image component for optimized images
- App Router with automatic code splitting
- CSS-in-JS with Tailwind (zero runtime)
- Firebase SDK tree-shaking
- Lazy loading for admin components

## 🐛 Troubleshooting

### Firebase Connection Issues
- Verify `.env.local` variables are correct
- Check Firebase project billing (free tier may have limits)
- Ensure Firestore rules allow read access

### Authentication Not Working
- Verify Firebase Auth is enabled
- Check that you created an admin user
- Clear browser cache and cookies

### Images Not Loading
- Verify images exist in `/public/images/`
- Check file paths match exactly (case-sensitive)
- Ensure Next.js dev server is running

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev
```

## 📝 License

© 2025 EL SHROUQ Import & Export. All rights reserved.

## 🤝 Support

For questions or issues:
- **Email**: info@el-shrouq.com
- **Phone**: +20 1023498590

---

**Built with ❤️ using Next.js + Firebase**
