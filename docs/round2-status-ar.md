# الجولة الثانية

## ما تم

- استبدال صفحة البداية بـ portal أبيض احترافي بدل شاشة Flutter build المباشرة.
- إضافة app catalog قابل للعمل من Supabase بعد تشغيل migrations، ومعه fallback محلي حتى لا يتعطل الموقع.
- إضافة صفحات:
  - `/` التطبيقات.
  - `/apps/:slug` صفحة لكل تطبيق.
  - `/team` توزيع الفريق.
  - `/plan` خطة التنفيذ.
  - `/backend` حالة Supabase.
- إضافة API routes لـ Vercel:
  - `/api/health`
  - `/api/suggestions`
- تحديث Edge Function `notify-suggestion` لتستخدم `SUPABASE_SECRET_KEY` بدل افتراض `service_role` القديم.
- إبقاء ملفات ROM وcovers غير المراجعة خارج Git public head.

## حالة Supabase الحقيقية الآن

- المشروع `https://asplwsmyacuttbdjtgbk.supabase.co` يرد من الـ API.
- جدول `public.apps` غير موجود حتى الآن، لذلك migrations لم تطبق بعد.
- Google وApple Auth غير مفعلة في Supabase Auth settings حتى الآن.

## المطلوب لتطبيق الباكند

مفاتيح `sb_publishable` و`sb_secret` لا تكفي لتشغيل SQL migrations. نحتاج واحد من التالي:

- Supabase Access Token + database password ثم:

```sh
supabase link --project-ref asplwsmyacuttbdjtgbk
supabase db push
```

- أو direct Postgres connection string ثم:

```sh
supabase db push --db-url "<postgres-url>"
```

- أو تنفيذ ملفات SQL من مجلد `supabase/migrations` في Supabase SQL Editor.

## Vercel Environment Variables

لا تحفظ القيم السرية داخل Git. ضعها في Vercel:

```sh
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_URL=
SUPABASE_SECRET_KEY=
SUPPORT_EMAIL=opensea3987@gmail.com
RESEND_API_KEY=
FROM_EMAIL=
```

## أولوية الفريق

الأهم الآن فعليًا:

- Flutter Frontend Engineer لاسترجاع سورس Flutter الأصلي وربط onboarding/navigation/login.
- UI/UX Designer لتثبيت صفحة التطبيقات والتفاصيل والاقتراحات في Figma.
- Backend Developer لتطبيق migrations، تفعيل OAuth، وضبط الإيميل.
