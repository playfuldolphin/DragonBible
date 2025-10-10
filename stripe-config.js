const STRIPE_CONFIG = {
    publishableKey: 'pk_test_YOUR_KEY_HERE',
    
    prices: {
        premium_monthly: 'price_YOUR_PRICE_ID_HERE',
        lifetime: 'price_YOUR_PRICE_ID_HERE'
    }
};

async function createCheckoutSession(priceId, mode = 'subscription') {
    try {
        const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'price': priceId,
                'mode': mode,
                'success_url': window.location.origin + '/success.html',
                'cancel_url': window.location.origin + '/index.html#pricing',
            })
        });

        const session = await response.json();
        
        const stripe = Stripe(STRIPE_CONFIG.publishableKey);
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            alert(result.error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Payment error. Please try again.');
    }
}

function subscribePremiumStripe() {
    if (STRIPE_CONFIG.publishableKey === 'pk_test_YOUR_KEY_HERE') {
        alert('🐉 Stripe Integration Ready!\n\nTo activate real payments:\n\n1. Sign up at stripe.com\n2. Get your Publishable Key from Dashboard\n3. Create Products:\n   - Premium Monthly ($9.99/month)\n   - Lifetime Access ($99 one-time)\n4. Get the Price IDs\n5. Update stripe-config.js with your keys\n\nThe integration is ready to go live!');
        return;
    }
    
    createCheckoutSession(STRIPE_CONFIG.prices.premium_monthly, 'subscription');
}

function buyLifetimeStripe() {
    if (STRIPE_CONFIG.publishableKey === 'pk_test_YOUR_KEY_HERE') {
        alert('🐉 Stripe Integration Ready!\n\nTo activate real payments:\n\n1. Sign up at stripe.com\n2. Get your Publishable Key from Dashboard\n3. Create Products:\n   - Premium Monthly ($9.99/month)\n   - Lifetime Access ($99 one-time)\n4. Get the Price IDs\n5. Update stripe-config.js with your keys\n\nThe integration is ready to go live!');
        return;
    }
    
    createCheckoutSession(STRIPE_CONFIG.prices.lifetime, 'payment');
}
