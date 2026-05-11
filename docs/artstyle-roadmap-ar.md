# خطة Art Style Apps

## قراءة المشروع الحالية

- الموجود في `/Volumes/WMCC/web` هو build Flutter Web جاهز، وليس سورس Flutter كامل. لا يوجد `pubspec.yaml` ولا مجلد `lib/`.
- التطبيق الحالي يعتمد على `main.dart.js` وفيه قائمة تطبيقات hardcoded مثل `PolarVault X`, `Nanny Abu Dhabi`, `Run With Us`, `Snake Modern Game`, `CUBE STACK HEROES`, `bricknova`, و`Comics Hero`.
- حجم المشروع حوالي 600MB، منها حوالي 359MB داخل `.git` بعد أول commit.
- يوجد 194 ملف AppleDouble من نوع `._*`. هذه ملفات نظام macOS وليست محتوى تطبيق.
- ملفات `roms/*.md` ليست ملفات Markdown؛ هي ROM binaries لألعاب Sega Genesis / Mega Drive تجارية. لذلك أي نشر عام أو تحميل مباشر يحتاج مراجعة حقوق. الخطة الجديدة تمنع `/roms/*` على Vercel وتترك التشغيل العام مقفلًا حتى تكون الملفات owned/licensed/public-domain/user-provided.
- مسارات Flutter تتوقع `assets/images/...` بينما الملفات الحالية في `images/...`. أضفت `vercel.json` يعيد كتابة `/assets/images/*` إلى `/images/*` حتى لا تنكسر الصور في Vercel.

## المنتج المطلوب

الواجهة تكون بيضاء ونظيفة ومباشرة:

- صفحة رئيسية تعرض نبذة عن Art Style Apps والتطبيقات المنشورة.
- صفحة خاصة لكل تطبيق: وصف، صور، طريقة الاستخدام أو طريقة اللعب، روابط App Store / Google Play / TestFlight / direct عند السماح، وسياسة الخصوصية.
- وضع زائر بدون تسجيل دخول: تصفح التطبيقات وإرسال اقتراح.
- تسجيل دخول اختياري عبر Google وApple: للمفضلة، حفظ التقدم، الاختبارات، ولوحة الفريق.
- نموذج اقتراحات يرسل إلى `opensea3987@gmail.com`.
- صفحة فريق: أسماء الفريق لاحقًا، الآن فيها placeholders للمصمم، Flutter، Backend، QA/Store Ops.
- منطقة Arcade آمنة: تعرض فقط الملفات القانونية بعد مراجعة الحقوق.

## Supabase Backend

تم تجهيز migrations:

- `profiles`: مستخدمين وأدوار.
- `apps`: كتالوج التطبيقات.
- `app_releases`: حالة كل تطبيق على iOS/Android/Web.
- `app_media`: شعارات، صور، screenshots.
- `app_download_links`: روابط التحميل والمتاجر.
- `app_page_sections`: محتوى صفحات التطبيقات.
- `project_members`, `workstreams`, `milestones`, `tasks`, `design_reviews`: شغل الفريق والمصمم.
- `suggestions`: اقتراحات الزوار والمستخدمين.
- `visitor_sessions`, `play_sessions`: خطة الزوار واللعب.
- `rom_catalog`: فهرسة الملفات القابلة للعب مع legal status.
- `services`: الخدمات المقترحة.
- `site_settings`: إعدادات عامة مثل الدعم وخطة Auth.

الحماية:

- RLS مفعّل على الجداول.
- القراءة العامة فقط للمحتوى المنشور.
- الاقتراحات يمكن إدخالها من الزوار، والقراءة للفريق.
- ROMs لا تظهر للعامة إلا إذا كانت قانونية ومفعلة.
- bucket `rom-files` خاص وليس عامًا.
- bucket `app-assets` عام للصور.

## Auth

Supabase Auth يدعم Google وApple كخيارات OAuth. المطلوب عند الإعداد:

- `SITE_URL`: رابط الإنتاج على Vercel.
- Redirect URLs:
  - `http://localhost:3000/**`
  - رابط Vercel production.
  - pattern لروابط Vercel preview.
- Apple يحتاج Services ID وsecret، والـ secret له دورة تجديد يجب متابعتها.

## Email Suggestions

أضفت Edge Function:

- `supabase/functions/notify-suggestion/index.ts`

السيناريو:

1. الواجهة تحفظ الرسالة في جدول `suggestions`.
2. الواجهة تستدعي الدالة مع `suggestion_id`.
3. الدالة ترسل إيميل إلى `opensea3987@gmail.com`.
4. لو `RESEND_API_KEY` غير مضبوط، ترجع preview بدون تعطيل التجربة.

## التطبيقات الأولية من screenshots

- Pixel Arcade Hub: Android production، audience 362، آخر تحديث 2026-05-10.
- ArcadiaX: Android production، audience 51، آخر تحديث 2026-05-10.
- ARCADIAX2: iOS waiting for review.
- ArcadiaXX: iOS waiting for review، version 1.0.20.
- Nanny Abu Dhabi / NANNY FINDER / Find nannies in Abu Dhabi: يحتاج توحيد naming قبل النشر.
- PolarVault X: iOS ready for distribution.
- ReemVerse: iOS prepare for submission.
- Snake Modern Game: Android production وiOS ready for distribution.
- CUBE STACK HEROES: iOS ready for distribution.
- bricknova: Android production وiOS ready for distribution.
- Run With Us: Android closed testing وiOS ready for distribution.

## خطة العمل

### المرحلة 1: تنظيف ونشر آمن

- منع public ROM downloads قبل الإنتاج.
- إزالة ملفات `._*` من git.
- نقل ROM binaries إلى تخزين خاص أو حذفها من الفرع العام حتى تثبت الحقوق.
- ربط Vercel مع GitHub.
- ضبط env vars.

### المرحلة 2: Supabase

- إنشاء مشروع Supabase.
- تشغيل migrations.
- تفعيل Google وApple OAuth.
- رفع صور التطبيقات إلى `app-assets` أو إبقاء مسارات Vercel الحالية مؤقتًا.
- اختبار RLS من anon/authenticated/service_role.

### المرحلة 3: التصميم

- المصمم يبني قالب أبيض موحد:
  - App card.
  - App detail page.
  - Download block.
  - Suggestion form.
  - Team page.
  - Legal/ROM status.

### المرحلة 4: Flutter source

لازم نحصل على سورس Flutter الأصلي، لأن الموجود build نهائي. بعد توفر السورس:

- تركيب Supabase client.
- استبدال البيانات hardcoded بقراءة من `apps`.
- إضافة guest session.
- إضافة Google/Apple sign-in.
- إضافة suggestion form.
- إضافة app detail routes.
- إضافة safe playable-area حسب `rom_catalog`.

### المرحلة 5: التشغيل

- Vercel preview.
- QA على desktop/mobile.
- فحص App Store/Play links.
- اختبار الإيميلات.
- تشغيل analytics privacy-friendly.
- Production deploy.

## أوامر التشغيل المقترحة

```sh
supabase link --project-ref <project-ref>
supabase db push
supabase functions deploy notify-suggestion
supabase secrets set SUPPORT_EMAIL=opensea3987@gmail.com RESEND_API_KEY=<key> FROM_EMAIL="Art Style Apps <hello@your-domain.com>"
```

## مراجع رسمية

- Supabase Redirect URLs: https://supabase.com/docs/guides/auth/redirect-urls
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Storage buckets: https://supabase.com/docs/guides/storage/buckets/fundamentals
- Vercel rewrites: https://vercel.com/docs/rewrites
