# دليل رفع المشروع على Hostinger (مع دعم Node.js)

## المتطلبات
- ✅ خطة Hostinger تدعم Node.js
- Node.js 18.x أو أحدث
- npm أو yarn
- حساب Firebase مع بيانات الاتصال

## خطوات الرفع

### 1. رفع الملفات
- قم بفك ضغط ملف `el-shrouq-deployment.zip` على السيرفر
- ارفع جميع الملفات إلى المجلد المخصص لتطبيقات Node.js في Hostinger
  - عادة يكون في `domains/yourdomain.com/nodejs` أو `nodejs` في المجلد الرئيسي
  - أو استخدم File Manager في لوحة تحكم Hostinger

### 2. تثبيت المكتبات
افتح Terminal في Hostinger (Node.js App Manager) واكتب:
```bash
npm install
```

### 3. إعداد متغيرات البيئة
- في لوحة تحكم Hostinger، اذهب إلى Node.js App Manager
- أضف متغيرات البيئة (Environment Variables):
  - `NEXT_PUBLIC_FIREBASE_API_KEY` = your_api_key_here
  - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = your_auth_domain_here
  - `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = your_project_id_here
  - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = your_storage_bucket_here
  - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = your_messaging_sender_id_here
  - `NEXT_PUBLIC_FIREBASE_APP_ID` = your_app_id_here

**أو** أنشئ ملف `.env.local` في المجلد الرئيسي:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```

### 4. بناء المشروع
```bash
npm run build
```

### 5. تشغيل المشروع
في Node.js App Manager في Hostinger:
- **Start Command**: `npm start`
- **App Port**: اتركه فارغاً أو استخدم المنفذ المخصص (عادة 3000)
- اضغط "Start" أو "Restart"

### 6. إعداد النطاق (Domain)
- في Node.js App Manager، اربط النطاق الخاص بك بالتطبيق
- أو استخدم النطاق الفرعي المخصص من Hostinger

## إعدادات مهمة في Hostinger Node.js App Manager

### Start Command:
```
npm start
```

### Node.js Version:
اختر **Node.js 18.x** أو أحدث

### App Port:
اتركه فارغاً أو استخدم المنفذ المخصص من Hostinger

### Working Directory:
اتركه فارغاً (سيعمل من المجلد الرئيسي)

## ملاحظات إضافية

- ✅ المشروع الآن يعمل بالكامل Client-side (لا يحتاج Server-side rendering)
- ✅ جميع الصفحات تجلب البيانات من Firebase من المتصفح
- ✅ الصفحة الديناميكية `/products/[slug]` تعمل من المتصفح

## استكشاف الأخطاء

### خطأ في بناء المشروع:
- تأكد من تثبيت جميع المكتبات: `npm install`
- تأكد من صحة متغيرات البيئة

### خطأ في الاتصال بـ Firebase:
- تحقق من بيانات Firebase في `.env.local`
- تأكد من تفعيل Firestore و Storage في Firebase Console

### الموقع لا يعمل:
- تحقق من أن Node.js مثبت ويعمل
- تحقق من المنفذ المستخدم
- راجع سجلات الأخطاء في لوحة تحكم Hostinger

## الدعم
إذا واجهت أي مشاكل، راجع ملفات:
- `README.md` - معلومات عامة عن المشروع
- `QUICKSTART.md` - دليل البدء السريع
- `DEPLOYMENT.md` - معلومات إضافية عن النشر

