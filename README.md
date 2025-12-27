# সোশ্যাল কমার্স এজেন্ট 🤖

একটি বুদ্ধিমান AI-চালিত বিক্রয় সহায়ক যা WhatsApp, Facebook Messenger এবং Instagram এর মাধ্যমে স্বয়ংক্রিয়ভাবে গ্রাহকদের সেবা প্রদান করে এবং তাদের ক্রেতায় রূপান্তরিত করে।

## 🌟 বৈশিষ্ট্যসমূহ

- ✅ **তিনটি প্ল্যাটফর্ম সমর্থন**: WhatsApp, Facebook Messenger এবং Instagram
- ✅ **বুদ্ধিমান AI**: প্রাকৃতিক বাংলা ভাষায় গ্রাহকদের সাথে কথা বলে
- ✅ **স্বয়ংক্রিয় প্রতিক্রিয়া**: তাৎক্ষণিক উত্তর প্রদান করে ২৪/৭
- ✅ **বিক্রয় রূপান্তর**: দর্শকদের ক্রেতায় রূপান্তরিত করার জন্য অপটিমাইজড
- ✅ **কথোপকথন ট্র্যাকিং**: সমস্ত বার্তা এবং রূপান্তর ট্র্যাক করে
- ✅ **রিয়েল-টাইম ড্যাশবোর্ড**: লাইভ পরিসংখ্যান এবং কার্যকলাপ লগ

## 🚀 লাইভ ডেমো

**URL**: https://agentic-4d13543c.vercel.app

## 📋 সেটআপ নির্দেশাবলী

### পূর্বশর্ত

1. **Meta Developers অ্যাকাউন্ট**: https://developers.facebook.com
2. **OpenAI API Key** (ঐচ্ছিক, উন্নত AI এর জন্য): https://platform.openai.com
3. **Vercel অ্যাকাউন্ট** (deployment এর জন্য): https://vercel.com

### ১. Meta Platform Setup

#### WhatsApp Business API
1. Meta Developers এ যান এবং একটি App তৈরি করুন
2. WhatsApp Business API যোগ করুন
3. Phone Number ID এবং Access Token সংগ্রহ করুন
4. Webhook URL সেট করুন: `https://agentic-4d13543c.vercel.app/api/webhook/whatsapp`
5. Webhook Events সাবস্ক্রাইব করুন: `messages`

#### Facebook Messenger
1. একটি Facebook Page তৈরি করুন
2. Page Access Token জেনারেট করুন
3. Webhook URL সেট করুন: `https://agentic-4d13543c.vercel.app/api/webhook/messenger`
4. Webhook Events সাবস্ক্রাইব করুন: `messages`, `messaging_postbacks`

#### Instagram Messaging
1. Instagram Business অ্যাকাউন্ট Facebook Page এর সাথে সংযুক্ত করুন
2. Instagram Access Token সংগ্রহ করুন
3. Webhook URL সেট করুন: `https://agentic-4d13543c.vercel.app/api/webhook/instagram`
4. Webhook Events সাবস্ক্রাইব করুন: `messages`

### ২. Environment Variables

Vercel Dashboard এ নিম্নলিখিত environment variables যোগ করুন:

\`\`\`env
# OpenAI (ঐচ্ছিক - ডেমো মোড ছাড়াই কাজ করবে)
OPENAI_API_KEY=your_openai_api_key

# WhatsApp
WHATSAPP_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=your_custom_verify_token

# Facebook Messenger
FB_PAGE_ACCESS_TOKEN=your_facebook_page_token
FB_VERIFY_TOKEN=your_custom_verify_token
FB_APP_SECRET=your_app_secret

# Instagram
IG_ACCESS_TOKEN=your_instagram_access_token
IG_ACCOUNT_ID=your_instagram_business_account_id
\`\`\`

### ৩. Local Development

\`\`\`bash
# Dependencies ইনস্টল করুন
npm install

# Development server চালু করুন
npm run dev

# http://localhost:3000 এ খুলুন
\`\`\`

## 📱 ব্যবহার

### Webhook URLs

- WhatsApp: `https://agentic-4d13543c.vercel.app/api/webhook/whatsapp`
- Messenger: `https://agentic-4d13543c.vercel.app/api/webhook/messenger`
- Instagram: `https://agentic-4d13543c.vercel.app/api/webhook/instagram`

## 🎯 AI Agent Capabilities

এজেন্টটি নিম্নলিখিত ধরনের প্রশ্নের উত্তর দিতে পারে:

- 👋 সাধারণ অভিবাদন
- 💰 মূল্য জিজ্ঞাসা
- 🛍️ পণ্য তথ্য
- 🚚 ডেলিভারি তথ্য
- 📦 অর্ডার প্লেসমেন্ট
- 💳 পেমেন্ট তথ্য
- 🔄 রিটার্ন/এক্সচেঞ্জ

---

**URL**: https://agentic-4d13543c.vercel.app
