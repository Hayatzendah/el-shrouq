# Deployment Guide

## Option 1: Vercel (Recommended) ⭐

Vercel is the easiest and recommended way to deploy Next.js applications.

### Prerequisites
- GitHub account
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   In Vercel dashboard, go to Project Settings > Environment Variables:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - You'll get a production URL: `your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

### Automatic Deployments
Every push to `main` branch triggers automatic deployment!

---

## Option 2: Firebase Hosting

Deploy directly to Firebase (same platform as your database).

### Prerequisites
- Firebase CLI: `npm install -g firebase-tools`

### Steps

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```

   Configuration:
   - Use existing project: Select your Firebase project
   - Public directory: `.next`
   - Single-page app: `Yes`
   - Overwrite index.html: `No`

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

5. **Your site is live!**
   URL: `your-project.web.app` or `your-project.firebaseapp.com`

### Custom Domain on Firebase
```bash
firebase hosting:channel:deploy production --expires never
```

Then add custom domain in Firebase Console > Hosting.

---

## Option 3: Netlify

Another excellent option with automatic deployments.

### Steps

1. **Push to GitHub** (same as Vercel)

2. **Connect to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import from Git"
   - Select your repository

3. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Environment Variables**
   Add the same Firebase variables in Netlify dashboard

5. **Deploy**
   - Click "Deploy site"
   - Get your URL: `your-site.netlify.app`

---

## Option 4: Self-Hosted (VPS/Cloud)

Deploy on your own server (DigitalOcean, AWS, etc.).

### Prerequisites
- VPS with Node.js installed
- Domain name (optional)

### Steps

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Upload to Server**
   ```bash
   # Using SCP
   scp -r .next package.json package-lock.json user@your-server:/var/www/el-shrouq/

   # Or use SFTP, rsync, etc.
   ```

3. **Install Dependencies on Server**
   ```bash
   ssh user@your-server
   cd /var/www/el-shrouq
   npm install --production
   ```

4. **Set Environment Variables**
   ```bash
   # Create .env.local on server
   nano .env.local
   # Paste your Firebase config
   ```

5. **Run with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "el-shrouq" -- start
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## Post-Deployment Checklist

### 1. Test the Website
- [ ] Home page loads correctly
- [ ] All navigation links work
- [ ] Images display properly
- [ ] Contact form submits successfully
- [ ] Products page filters work
- [ ] Mobile responsive design

### 2. Test Admin Dashboard
- [ ] Can login at `/admin/login`
- [ ] Dashboard loads with stats
- [ ] Can create/edit/delete products
- [ ] Can toggle visibility
- [ ] Seed button works (if database is empty)

### 3. Firebase Configuration
- [ ] Firestore security rules are set
- [ ] Authentication is enabled
- [ ] Admin user exists
- [ ] Firebase quota/billing is configured

### 4. Performance
- [ ] Run Lighthouse audit (aim for 90+ score)
- [ ] Check page load times
- [ ] Optimize images if needed
- [ ] Enable CDN (Vercel/Netlify do this automatically)

### 5. SEO (Optional)
- [ ] Add sitemap.xml
- [ ] Configure robots.txt
- [ ] Add meta tags for social sharing
- [ ] Submit to Google Search Console

---

## Environment Variables Reference

Required for production:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

**Important**: All variables must start with `NEXT_PUBLIC_` to be accessible in the browser.

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Firebase Connection Issues
- Verify environment variables are set correctly
- Check Firebase project billing status
- Ensure Firestore/Auth are enabled

### Images Not Loading
- Check that `/public/images/` folder is included in deployment
- Verify image paths are correct (case-sensitive)
- Ensure Next.js Image domains are configured in `next.config.ts`

### Admin Can't Login
- Verify admin user exists in Firebase Auth
- Check that correct Firebase project is configured
- Clear browser cache/cookies

---

## Monitoring & Maintenance

### Vercel Analytics
Enable in Project Settings > Analytics for:
- Traffic insights
- Performance metrics
- Web vitals

### Firebase Monitoring
Check Firebase Console for:
- Database usage
- Authentication activity
- Error logs

### Regular Updates
```bash
# Update dependencies periodically
npm update
npm audit fix

# Rebuild and redeploy
npm run build
git push origin main  # Auto-deploys on Vercel/Netlify
```

---

## Cost Estimates

### Free Tier (Recommended for Small Sites)
- **Vercel**: Free (Hobby plan)
- **Firebase**: Free up to quota
- **Domain**: $10-15/year (optional)

Total: **$0-15/year**

### Production (High Traffic)
- **Vercel**: $20/month (Pro plan)
- **Firebase**: Pay-as-you-go (~$25-50/month)
- **Domain**: $10-15/year

Total: **$50-75/month**

---

## Support

Need help with deployment?
- **Email**: info@el-shrouq.com
- **Phone**: +20 1023498590

---

**Happy Deploying! 🚀**
