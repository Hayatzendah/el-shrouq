# Deployment Checklist for Hostinger

## ✅ الملفات الأساسية المطلوبة

### ملفات التكوين (Config Files)
- [x] `package.json` - مع `engines` محدد
- [x] `package-lock.json` - لتثبيت دقيق للمكتبات
- [x] `next.config.ts` - إعدادات Next.js
- [x] `tsconfig.json` - إعدادات TypeScript
- [x] `tailwind.config.ts` - إعدادات TailwindCSS
- [x] `postcss.config.mjs` - إعدادات PostCSS
- [x] `.nvmrc` - تحديد إصدار Node.js (18.20.0)
- [x] `.node-version` - تحديد إصدار Node.js (18.20.0)

### المجلدات الأساسية
- [x] `app/` - صفحات Next.js
- [x] `components/` - المكونات القابلة لإعادة الاستخدام
- [x] `lib/` - المكتبات والدوال المساعدة
- [x] `public/` - الملفات الثابتة (الصور)
- [x] `styles/` - ملفات CSS
- [x] `contexts/` - React Contexts

### ملفات مهمة
- [x] `next-env.d.ts` - تعريفات TypeScript لـ Next.js
- [x] `.gitignore` - ملفات مستبعدة من Git

## 🔧 إعدادات Hostinger

### في Deployment Settings:
1. **Node.js Version**: `18.x` (ليس 20.x)
2. **Build Command**: `npm run build`
3. **Start Command**: `npm start`
4. **Root Directory**: `./`

### Environment Variables (6 متغيرات):
1. `NEXT_PUBLIC_FIREBASE_API_KEY`
2. `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
3. `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
4. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
5. `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
6. `NEXT_PUBLIC_FIREBASE_APP_ID`

## 📝 ملاحظات

- تأكد من رفع جميع الملفات إلى المستودع
- لا ترفع `node_modules` أو `.next`
- تأكد من إضافة متغيرات البيئة قبل البناء
- استخدم Node.js 18.x وليس 20.x

