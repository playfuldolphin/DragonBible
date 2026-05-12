# 🐉 Dragon Bible - Complete Setup Guide

This guide will help you set up payments, authentication, and deploy your Dragon Bible website.

---

## 📋 Table of Contents

1. [Stripe Payment Setup](#stripe-payment-setup)
2. [Firebase Authentication Setup](#firebase-authentication-setup)
3. [Server Deployment](#server-deployment)
4. [Testing](#testing)
5. [Going Live](#going-live)

---

## 💳 Stripe Payment Setup

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" and create an account
3. Complete business verification (required for live payments)

### Step 2: Get API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)
4. Save these keys - you'll need them soon

### Step 3: Create Products

1. Go to https://dashboard.stripe.com/products
2. Click "+ Add product"

**Product 1: Monthly Subscription**
- Name: "Dragon Rider Monthly"
- Description: "Full access to Dragon Bible premium features"
- Pricing: Recurring
- Price: $9.99 USD per month
- Click "Save product"
- **Copy the Price ID** (starts with `price_`)

**Product 2: Lifetime Access**
- Name: "Dragon Master Lifetime"
- Description: "Lifetime access to all Dragon Bible content"
- Pricing: One time
- Price: $99.00 USD
- Click "Save product"
- **Copy the Price ID** (starts with `price_`)

### Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your keys:
   ```env
   STRIPE_PUBLIC_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_PRICE_MONTHLY=price_your_monthly_id
   STRIPE_PRICE_LIFETIME=price_your_lifetime_id
   ```

3. Update `payment.js` line 12:
   ```javascript
   const STRIPE_PUBLIC_KEY = 'pk_test_your_key_here';
   ```

### Step 5: Set Up Webhooks

1. Go to https://dashboard.stripe.com/webhooks
2. Click "+ Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add to `.env`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

---

## 🔐 Firebase Authentication Setup

### Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Project name: "Dragon Bible"
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Authentication

1. In Firebase console, click "Authentication"
2. Click "Get started"
3. Enable **Email/Password**:
   - Click "Email/Password"
   - Toggle "Enable"
   - Click "Save"
4. Enable **Google Sign-In**:
   - Click "Google"
   - Toggle "Enable"
   - Add support email
   - Click "Save"

### Step 3: Create Firestore Database

1. Click "Firestore Database"
2. Click "Create database"
3. Start in **production mode**
4. Choose location (closest to your users)
5. Click "Enable"

### Step 4: Set Firestore Rules

1. Click "Rules" tab
2. Replace with:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /comments/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```
3. Click "Publish"

### Step 5: Get Firebase Config

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click web icon (</>) to add web app
4. App nickname: "Dragon Bible Web"
5. Don't check hosting
6. Click "Register app"
7. Copy the firebaseConfig object
8. Paste into `auth.js` (line 6-13)

### Step 6: Add Firebase to HTML

1. Add before closing `</head>` in `index.html`:
   ```html
   <!-- Firebase -->
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
   <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
   
   <!-- Auth Script -->
   <script src="auth.js"></script>
   ```

---

## 🚀 Server Deployment

### Option 1: Deploy to Heroku (Recommended for Beginners)

1. Install Heroku CLI:
   ```bash
   brew install heroku/brew/heroku  # Mac
   # Or download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. Login to Heroku:
   ```bash
   heroku login
   ```

3. Create new app:
   ```bash
   heroku create dragonbible
   ```

4. Set environment variables:
   ```bash
   heroku config:set STRIPE_SECRET_KEY=sk_test_your_key
   heroku config:set STRIPE_PRICE_MONTHLY=price_your_monthly_id
   heroku config:set STRIPE_PRICE_LIFETIME=price_your_lifetime_id
   heroku config:set STRIPE_WEBHOOK_SECRET=whsec_your_secret
   ```

5. Deploy:
   ```bash
   git add .
   git commit -m "Initial deploy"
   git push heroku main
   ```

6. Open your app:
   ```bash
   heroku open
   ```

### Option 2: Deploy to Vercel (Great for Static Sites)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Add environment variables in Vercel dashboard

### Option 3: Deploy to Netlify (Easy Drag & Drop)

1. Go to https://www.netlify.com
2. Drag your DragonBible folder to deploy
3. Add environment variables in Site Settings
4. Connect custom domain

---

## 🧪 Testing

### Test Payments

Stripe provides test card numbers:

**Successful payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Failed payment:**
- Card: `4000 0000 0000 0002`

**3D Secure Required:**
- Card: `4000 0025 0000 3155`

### Test Authentication

1. Create test account with fake email
2. Try Google sign-in
3. Test password reset
4. Verify reading progress saves

### Local Testing

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start server:
   ```bash
   npm start
   ```

3. Open browser:
   ```
   http://localhost:3000
   ```

---

## 🌐 Going Live

### 1. Switch to Live Mode in Stripe

1. Go to Stripe dashboard
2. Toggle "Test mode" OFF (top right)
3. Get live API keys
4. Update `.env` with live keys
5. Recreate products in live mode
6. Update webhook endpoint to production URL

### 2. Update Firebase Security

1. Review Firestore rules for production
2. Enable App Check for security
3. Set up monitoring

### 3. Domain Setup

1. Purchase domain (Namecheap, Google Domains, etc.)
2. Point DNS to your hosting:
   - **Heroku**: Add custom domain in settings
   - **Vercel**: Add domain in project settings
   - **Netlify**: Add domain in site settings

3. Enable HTTPS (automatic on most platforms)

### 4. Add Google Analytics

1. Get GA4 tracking ID
2. Update `analytics.js` with your ID
3. Set up conversion tracking

### 5. Legal Pages

- [ ] Privacy Policy (use https://www.privacypolicygenerator.info/)
- [ ] Terms of Service
- [ ] Refund Policy
- [ ] Cookie Notice

### 6. Final Checklist

- [ ] Test all payment flows
- [ ] Test authentication
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Verify email capture
- [ ] Test audio narration
- [ ] Check page load speed
- [ ] Verify SEO tags
- [ ] Test social sharing
- [ ] Set up monitoring (Sentry, LogRocket)

---

## 🎯 Marketing Launch Checklist

### Pre-Launch

- [ ] Email list of 100+ people ready
- [ ] Social media accounts created
- [ ] 5 blog posts written
- [ ] Reddit posts scheduled
- [ ] YouTube trailer created

### Launch Week

- [ ] Send launch email to list
- [ ] Post to r/mythology, r/fantasy, r/worldbuilding
- [ ] Share on Twitter/X with #DragonMythology
- [ ] Post on Instagram with dragon art
- [ ] TikTok dramatic reading videos
- [ ] ProductHunt launch
- [ ] Hacker News "Show HN"

### Post-Launch

- [ ] Collect user feedback
- [ ] Monitor analytics daily
- [ ] Respond to all comments
- [ ] Fix bugs immediately
- [ ] Add most-requested features
- [ ] Send weekly newsletter

---

## 📊 Success Metrics to Track

**Week 1:**
- 1,000 visitors
- 100 email signups
- 5 paying customers

**Month 1:**
- 10,000 visitors
- 500 email signups
- 50 paying customers
- $500 MRR

**Month 3:**
- 50,000 visitors
- 2,000 email signups
- 200 paying customers
- $2,000 MRR

---

## 🆘 Troubleshooting

### Payment Not Working
- Check Stripe API keys are correct
- Verify webhook secret matches
- Check browser console for errors
- Test with test card numbers first

### Firebase Auth Fails
- Verify Firebase config is correct
- Check email/password is enabled
- Ensure domain is authorized in Firebase
- Check browser console for errors

### Server Won't Start
- Run `npm install` first
- Check `.env` file exists
- Verify all environment variables set
- Check port 3000 isn't already in use

---

## 📞 Support

**Email:** mr.noahwilson@gmail.com

**Documentation:**
- Stripe: https://stripe.com/docs
- Firebase: https://firebase.google.com/docs

---

## 🎉 You're Ready!

Your Dragon Bible is ready to launch and make money. Good luck! 🐉

**Remember:** Start with test mode, verify everything works, then switch to live mode when you're confident.
