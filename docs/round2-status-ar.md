# الجولة الثانية

## ما تم

- استبدال صفحة البداية بـ portal أبيض احترافي بدل شاشة Flutter build المباشرة.
- ربط الكتالوج بـ Supabase مع fallback محلي.
- إضافة صفحات:
  - `/` التطبيقات.
  - `/apps/:slug` صفحة لكل تطبيق.
  - `/team` توزيع الفريق.
  - `/plan` خطة التنفيذ.
  - `/backend` حالة Supabase والباكند.
- إضافة Vercel API routes:
  - `/api/health`
  - `/api/apps`
  - `/api/backend-status`
  - `/api/suggestions`
- تطبيق migrations على Supabase وربط المشروع.
- نشر Edge Function `notify-suggestion`.
- نشر Production على Vercel:
  - `https://artstyle-web.vercel.app`
- دفع التغييرات إلى GitHub:
  - `https://github.com/faisal39873987/artstyle-web.git`
- إبقاء ملفات ROM وcovers غير المراجعة خارج Git public head.

## حالة Supabase الحقيقية الآن

- المشروع `https://asplwsmyacuttbdjtgbk.supabase.co` يرد من الـ API.
- جداول `public.apps` و`public.app_releases` و`public.suggestions` موجودة.
- بيانات التطبيقات والفريق والخدمات مزروعة.
- RLS مفعل على الجداول الأساسية.
- Google وApple Auth تحتاج تفعيل يدوي من لوحة Supabase لأن كل مزود يحتاج OAuth credentials خاصة.

## الجولة الخلفية الخامسة

- إضافة view آمن للكتالوج: `public.app_catalog_public`.
- إضافة view حالة عامة: `public.backend_public_status`.
- إضافة حماية rate limit للاقتراحات.
- إضافة dedupe key لمنع تكرار نفس الاقتراح.
- إضافة تتبع إرسال الإشعارات:
  - `notified_at`
  - `notification_attempts`
  - `last_notification_error`

## المتبقي

- إضافة `RESEND_API_KEY` في Supabase secrets حتى يتم إرسال الإيميل فعليًا.
- تفعيل Google Provider وApple Provider في Supabase Auth.
- استرجاع سورس Flutter الأصلي إذا نبي نربط login/onboarding داخل التطبيق نفسه.
- تأكيد روابط App Store وGoogle Play الرسمية لكل تطبيق.

## تحقق 2026-05-12

- GitHub مربوط: `faisal39873987/artstyle-web` على branch `main`.
- Vercel مربوط بالمشروع `open-seas-projects/artstyle-web` وينشر production من `main`.
- رابط الإنتاج العام يعمل: `https://artstyle-web.vercel.app`.
- Supabase مربوط بالمشروع `asplwsmyacuttbdjtgbk`.
- migrations المطبقة على الريموت:
  - `20260511173000`
  - `20260511174000`
  - `20260512090000`
  - `20260512124500`
  - `20260512125500`
- اختبارات الإنتاج نجحت:
  - `/api/health`
  - `/api/apps`
  - `/api/backend-status`
  - redirect لمسارات `/roms/*`
