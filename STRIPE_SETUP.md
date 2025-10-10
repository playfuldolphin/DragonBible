# Stripe Payment Setup Guide

## Quick Start

Your Dragon Bible is ready to accept payments! Follow these steps to go live:

## Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Click "Start now" 
3. Sign up with your email
4. Complete verification

## Step 2: Get Your Publishable Key

1. Log into Stripe Dashboard
2. Click "Developers" in the left sidebar
3. Click "API keys"
4. Copy your "Publishable key" (starts with `pk_test_` for test mode)

## Step 3: Create Products in Stripe

### Premium Monthly Subscription

1. Go to "Products" in Stripe Dashboard
2. Click "+ Add Product"
3. Fill in:
   - **Name**: Dragon Bible Premium
   - **Description**: Full access to all Dragon Bible content
   - **Price**: $9.99
   - **Billing period**: Monthly
   - **Add a trial period**: 7 days (optional but recommended!)
4. Click "Save product"
5. **Copy the Price ID** (starts with `price_`)

### Lifetime Access (One-time Payment)

1. Go to "Products" in Stripe Dashboard
2. Click "+ Add Product"
3. Fill in:
   - **Name**: Dragon Bible Lifetime Access
   - **Description**: Pay once, access forever
   - **Price**: $99
   - **Billing period**: One time
4. Click "Save product"
5. **Copy the Price ID** (starts with `price_`)

## Step 4: Update Your Configuration

Open `stripe-config.js` and replace:

```javascript
const STRIPE_CONFIG = {
    publishableKey: 'pk_test_YOUR_ACTUAL_KEY_HERE',
    
    prices: {
        premium_monthly: 'price_YOUR_PREMIUM_PRICE_ID',
        lifetime: 'price_YOUR_LIFETIME_PRICE_ID'
    }
};
```

## Step 5: Test Payments

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Expiry**: Any future date
- **CVC**: Any 3 digits
- **ZIP**: Any 5 digits

## Step 6: Go Live!

When ready for real payments:

1. Complete business verification in Stripe
2. Activate your account
3. Switch from test keys to live keys:
   - Use `pk_live_` publishable key (not `pk_test_`)
   - Update price IDs with live versions

## Backend (Optional but Recommended)

For production, you should create a simple backend to handle webhooks and secure checkout creation. Options:

### Easy Option: Stripe Payment Links
1. In Stripe Dashboard, go to "Payment Links"
2. Create links for each product
3. Replace button functions to open these links

### Better Option: Simple Backend
Use Netlify Functions, Vercel Serverless, or a simple Express server to:
- Create checkout sessions securely
- Handle webhooks for subscription updates
- Verify payments server-side

## Security Notes

- ✅ Publishable keys are safe to use in frontend (they start with `pk_`)
- ❌ Never expose Secret keys (they start with `sk_`)
- ✅ Current setup is secure for basic payments
- ✅ For production, add backend webhook handling

## Support

If you need help:
- Stripe docs: https://stripe.com/docs
- Email: mr.noahwilson@gmail.com

## Current Status

Your site is configured to:
- Show setup instructions when keys aren't configured
- Accept real payments once you add your keys
- Redirect to success page after payment
- Handle both subscriptions and one-time payments

🐉 Your Dragon Bible is ready to make money!
