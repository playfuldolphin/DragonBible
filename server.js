// Dragon Bible Backend Server (Node.js + Express)
// This handles Stripe webhooks, API endpoints, and the AI Lore Oracle

// SETUP:
// 1. npm install
// 2. Copy .env.example to .env and fill in your keys
// 3. node server.js  (or: npm run dev)

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const { ORACLE_SYSTEM_PROMPT } = require('./lore-context');
require('dotenv').config();

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// Product Price IDs from Stripe
const PRICES = {
    monthly: process.env.STRIPE_PRICE_MONTHLY, // Set in .env
    lifetime: process.env.STRIPE_PRICE_LIFETIME // Set in .env
};

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { priceId, planType, successUrl, cancelUrl } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: planType === 'monthly' ? 'subscription' : 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                planType: planType
            },
            allow_promotion_codes: true,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Checkout session error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Verify session after payment
app.get('/api/verify-session/:sessionId', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
        
        if (session.payment_status === 'paid') {
            res.json({
                success: true,
                subscription: session.subscription || session.payment_intent,
                planType: session.metadata.planType,
                customerId: session.customer,
                amount: session.amount_total / 100
            });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error('Verification error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Check subscription status
app.get('/api/check-subscription/:customerId', async (req, res) => {
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: req.params.customerId,
            status: 'active',
            limit: 1
        });

        res.json({
            active: subscriptions.data.length > 0,
            subscription: subscriptions.data[0] || null
        });
    } catch (error) {
        console.error('Subscription check error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Create Customer Portal session
app.post('/api/create-portal-session', async (req, res) => {
    try {
        const { customerId, returnUrl } = req.body;

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: returnUrl,
        });

        res.json({ url: session.url });
    } catch (error) {
        console.error('Portal session error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Webhook endpoint for Stripe events
app.post('/api/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            console.log('Payment successful:', session.id);
            // Here you could send welcome email, update database, etc.
            break;

        case 'customer.subscription.updated':
            const subscription = event.data.object;
            console.log('Subscription updated:', subscription.id);
            break;

        case 'customer.subscription.deleted':
            const canceledSub = event.data.object;
            console.log('Subscription canceled:', canceledSub.id);
            // Here you could revoke access, send email, etc.
            break;

        case 'invoice.payment_failed':
            const failedInvoice = event.data.object;
            console.log('Payment failed:', failedInvoice.id);
            // Here you could notify customer, retry payment, etc.
            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({received: true});
});

// ============================================================
// AI LORE ORACLE ENDPOINT
// ============================================================

// In-memory rate limiter for demo (unauthenticated) requests
// Resets on server restart — fine for a demo gate
const demoRateLimit = new Map(); // ip -> { count, resetAt }
const DEMO_LIMIT_PER_IP = 3;
const DEMO_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

function getDemoRemaining(ip) {
    const now = Date.now();
    const record = demoRateLimit.get(ip);
    if (!record || now > record.resetAt) {
        return DEMO_LIMIT_PER_IP;
    }
    return Math.max(0, DEMO_LIMIT_PER_IP - record.count);
}

function consumeDemo(ip) {
    const now = Date.now();
    const record = demoRateLimit.get(ip) || { count: 0, resetAt: now + DEMO_WINDOW_MS };
    if (now > record.resetAt) {
        record.count = 0;
        record.resetAt = now + DEMO_WINDOW_MS;
    }
    record.count++;
    demoRateLimit.set(ip, record);
}

async function verifySubscription(customerId) {
    if (!customerId || !process.env.STRIPE_SECRET_KEY) return false;
    try {
        const subscriptions = await stripe.subscriptions.list({
            customer: customerId,
            status: 'active',
            limit: 1,
        });
        // Also check for lifetime (one-time payment) via metadata on customer
        if (subscriptions.data.length > 0) return true;
        // Check for lifetime payment intent stored as customer metadata
        const customer = await stripe.customers.retrieve(customerId);
        return customer.metadata && customer.metadata.lifetime === 'true';
    } catch {
        return false;
    }
}

app.post('/api/oracle', async (req, res) => {
    const { question, customerId } = req.body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
        return res.status(400).json({ error: 'question is required' });
    }
    if (question.length > 800) {
        return res.status(400).json({ error: 'question too long (max 800 characters)' });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
        return res.status(503).json({ error: 'Oracle not configured — ANTHROPIC_API_KEY missing' });
    }

    // Determine access level
    let isSubscriber = false;
    if (customerId) {
        isSubscriber = await verifySubscription(customerId);
    }

    if (!isSubscriber) {
        // Demo mode — rate-limited by IP
        const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket.remoteAddress;
        const remaining = getDemoRemaining(ip);

        if (remaining <= 0) {
            return res.status(429).json({
                error: 'demo_limit_reached',
                message: 'You have used all free Oracle queries. Subscribe for unlimited access.',
            });
        }
        consumeDemo(ip);
    }

    try {
        const message = await anthropic.messages.create({
            model: 'claude-opus-4-5',
            max_tokens: isSubscriber ? 1500 : 800,
            system: ORACLE_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: question.trim() }],
        });

        const answer = message.content[0]?.text || '';

        return res.json({
            answer,
            subscriber: isSubscriber,
        });
    } catch (err) {
        console.error('Oracle API error:', err.message);
        return res.status(500).json({ error: 'Oracle encountered an error. Try again.' });
    }
});

// Email capture endpoint (optional - store in database)
app.post('/api/capture-email', async (req, res) => {
    try {
        const { email, source } = req.body;
        
        // Here you would save to your database
        // For now, just log it
        console.log('Email captured:', email, 'from', source);
        
        // You could also add to email marketing service (Mailchimp, ConvertKit, etc.)
        
        res.json({ success: true });
    } catch (error) {
        console.error('Email capture error:', error);
        res.status(400).json({ error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🐉 Dragon Bible server running on port ${PORT}`);
    console.log(`📍 ${DOMAIN}`);
});
