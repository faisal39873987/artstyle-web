# باكند خمسة

هذه دفعة Backend مركزة من خمس مهام عملية:

1. حماية الاقتراحات من التكرار والسبام.
   - Hash للـ IP والـ user agent بدون حفظ البيانات الخام.
   - Rate limit من قاعدة البيانات.
   - Dedupe key يمنع نفس الرسالة من الدخول أكثر من مرة.

2. API للكتالوج.
   - `/api/apps`
   - يعتمد على `public.app_catalog_public`.
   - يرجع التطبيقات، الإصدارات، الصور، روابط التحميل، وأقسام الصفحة من View آمن للعرض العام.

3. API لحالة الباكند.
   - `/api/backend-status`
   - يرجع عدد التطبيقات، الإصدارات، أعضاء الفريق، الاقتراحات آخر 7 أيام، وحالة مهام الباكند.

4. تتبع إشعارات الاقتراحات.
   - `notified_at`
   - `notification_attempts`
   - `last_notification_error`
   - Edge Function تمنع إعادة إرسال نفس الاقتراح إذا كان مرسلًا قبل.

5. خطة عمل Backend داخل Supabase.
   - تمت إضافة خمس مهام إلى workstream `supabase-backend`.
   - تظهر في صفحة `/backend`.

## ملاحظة تشغيل

الإيميل لن يخرج فعليًا حتى يتم ضبط `RESEND_API_KEY` داخل Supabase secrets. بدونها يتم حفظ الاقتراح ويظهر أن إرسال البريد pending.

## حالة التحقق

تم التحقق من الجولة الخامسة على الإنتاج بتاريخ 2026-05-12:

- `/api/health` يرجع `ok: true`.
- `/api/apps` يرجع كتالوج Supabase العام.
- `/api/backend-status` يرجع الخطة وحالة المهام.
- GitHub متصل بـ Vercel على branch `main`.
- Production alias العام يعمل على `https://artstyle-web.vercel.app`.
