# تعليمات رفع المشروع على GitHub

## ✅ تم إعداد Git محلياً

تم إعداد Git وإنشاء commit بنجاح. الآن تحتاج إلى:

## الخطوات التالية:

### 1. إنشاء مستودع جديد على GitHub

1. اذهب إلى [GitHub.com](https://github.com)
2. اضغط على زر "+" في الأعلى → "New repository"
3. اسم المستودع: `el-shrouq`
4. اختر "Public" أو "Private"
5. **لا** تضع علامة على "Initialize this repository with a README"
6. اضغط "Create repository"

### 2. ربط المستودع المحلي بـ GitHub

بعد إنشاء المستودع على GitHub، ستحصل على رابط مثل:
`https://github.com/YOUR_USERNAME/el-shrouq.git`

قم بتشغيل هذه الأوامر (استبدل `YOUR_USERNAME` باسم المستخدم الخاص بك):

```bash
git remote add origin https://github.com/YOUR_USERNAME/el-shrouq.git
git push -u origin main
```

### 3. أو استخدم هذا الأمر مباشرة (بعد إنشاء المستودع):

```bash
# استبدل YOUR_USERNAME باسم المستخدم الخاص بك
git remote set-url origin https://github.com/YOUR_USERNAME/el-shrouq.git
git push -u origin main
```

## ملاحظات:

- إذا طُلب منك اسم المستخدم وكلمة المرور، استخدم:
  - **Username**: اسم المستخدم في GitHub
  - **Password**: Personal Access Token (ليس كلمة المرور العادية)
  
  لإنشاء Personal Access Token:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token
  3. اختر الصلاحيات: `repo`
  4. انسخ الرمز واستخدمه ككلمة مرور

## بعد الرفع:

بعد رفع المشروع بنجاح، يمكنك:
1. ربط المستودع بـ Hostinger
2. أو استخدام Vercel/Netlify للنشر التلقائي

