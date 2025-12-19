# دليل نشر المشروع على Hostinger مع PHP + MySQL

## 📋 الخطوات المطلوبة

### 1. إعداد قاعدة البيانات MySQL

1. سجل الدخول إلى **cPanel** في Hostinger
2. افتح **phpMyAdmin**
3. أنشئ قاعدة بيانات جديدة اسمها `el_shrouq`
4. استورد ملف `database/schema.sql`
   - اضغط على "Import"
   - اختر ملف `schema.sql`
   - اضغط "Go"

### 2. تكوين اتصال قاعدة البيانات

افتح ملف `api/config/database.php` وحدّث:

```php
private $host = "localhost";
private $db_name = "u123456_el_shrouq"; // اسم قاعدة البيانات من Hostinger
private $username = "u123456_dbuser";    // اسم المستخدم من Hostinger
private $password = "your_password";      // كلمة المرور من Hostinger
```

### 3. رفع ملفات PHP API

ارفع مجلد `api/` كاملاً إلى:
```
public_html/api/
```

الهيكل النهائي:
```
public_html/
  └── api/
      ├── config/
      │   ├── database.php
      │   └── cors.php
      ├── products/
      │   ├── read.php
      │   └── read_single.php
      ├── categories/
      │   └── read.php
      └── seasons/
          └── read.php
```

### 4. تكوين Next.js

1. أنشئ ملف `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

2. في `lib/phpApi.ts` سيتم استخدام هذا الـ URL تلقائياً

### 5. تحديث الكود للاستخدام PHP بدلاً من Firebase

استبدل استيرادات Firebase بـ PHP API:

**قبل:**
```typescript
import { getProducts } from '@/lib/firestore';
```

**بعد:**
```typescript
import { getProducts } from '@/lib/phpApi';
```

### 6. اختبار API

اختبر الـ endpoints:

- **المنتجات:** `https://yourdomain.com/api/products/read.php`
- **منتج واحد:** `https://yourdomain.com/api/products/read_single.php?slug=tomato`
- **الفئات:** `https://yourdomain.com/api/categories/read.php`
- **المواسم:** `https://yourdomain.com/api/seasons/read.php`

### 7. بيانات تجريبية

قاعدة البيانات تحتوي على:
- ✅ 5 فئات (Vegetables, Fruits, Citrus, Medicinal Plants, Frozen)
- ✅ 5 مواسم (Winter, Spring, Summer, Autumn, All Year)
- ✅ مستخدم إداري افتراضي:
  - Email: `admin@el-shrouq.com`
  - Password: `admin123` (غيّره فوراً!)

## 🔒 الأمان

1. **غيّر كلمة مرور الأدمن** بعد أول تسجيل دخول
2. لا تنشر ملف `.env.local` على GitHub
3. استخدم HTTPS في الإنتاج

## 📁 ملفات API المتوفرة

| Endpoint | Method | الوصف |
|----------|--------|-------|
| `/products/read.php` | GET | جلب جميع المنتجات |
| `/products/read_single.php?slug=X` | GET | جلب منتج واحد |
| `/categories/read.php` | GET | جلب جميع الفئات |
| `/seasons/read.php` | GET | جلب جميع المواسم |

## 🚀 الخطوة التالية

بعد إعداد كل شيء:
1. احذف مكتبة Firebase من `package.json`
2. احذف ملفات Firebase القديمة
3. Build المشروع: `npm run build`
4. Deploy على Hostinger

## ⚠️ ملاحظات مهمة

- تأكد من تفعيل `allow_url_fopen` في PHP
- تأكد من إصدار PHP >= 7.4
- CORS مفعّل لجميع الأصول (يمكن تخصيصه في `config/cors.php`)
