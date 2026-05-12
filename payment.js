// Dragon Bible - Stripe Payment Integration
// This handles subscription and one-time payment processing

// SETUP INSTRUCTIONS:
// 1. Sign up at https://stripe.com
// 2. Get your publishable key from the dashboard
// 3. Replace 'YOUR_PUBLISHABLE_KEY' below with your actual key
// 4. Set up products in Stripe dashboard:
//    - Monthly subscription: $9.99/month (recurring)
//    - Lifetime access: $99 (one-time)

const STRIPE_PUBLIC_KEY = 'YOUR_PUBLISHABLE_KEY'; // Replace with your Stripe publishable key
let stripe = null;

// Initialize Stripe
function initializeStripe() {
    if (typeof window.Stripe === 'undefined') {
        console.error('Stripe.js not loaded');
        return false;
    }
    
    stripe = window.Stripe(STRIPE_PUBLIC_KEY);
    return true;
}

// Product IDs from Stripe Dashboard
const PRODUCTS = {
    monthly: {
        priceId: 'price_monthly', // Replace with your actual Price ID from Stripe
        name: 'Dragon Rider Monthly',
        amount: 9.99,
        currency: 'usd',
        interval: 'month'
    },
    lifetime: {
        priceId: 'price_lifetime', // Replace with your actual Price ID from Stripe
        name: 'Dragon Master Lifetime',
        amount: 99,
        currency: 'usd',
        interval: 'one-time'
    }
};

// Create checkout session for subscription or one-time payment
async function createCheckoutSession(planType) {
    try {
        const product = PRODUCTS[planType];
        
        if (!product) {
            throw new Error('Invalid plan type');
        }

        // Call your backend to create a checkout session
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId: product.priceId,
                planType: planType,
                successUrl: `${window.location.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
                cancelUrl: `${window.location.origin}/#pricing`,
            }),
        });

        const session = await response.json();

        if (session.error) {
            throw new Error(session.error);
        }

        // Redirect to Stripe Checkout
        if (stripe) {
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        }

        // Track payment attempt
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackPaymentAttempt(planType, product.amount);
        }

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Payment error: ' + error.message);
        
        // Track payment failure
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackPaymentError(planType, error.message);
        }
    }
}

// Handle successful payment
function handlePaymentSuccess(sessionId) {
    // Verify the session with your backend
    fetch(`/api/verify-session/${sessionId}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Store subscription status
                localStorage.setItem('dragonbible_subscription', data.subscription);
                localStorage.setItem('dragonbible_subscription_type', data.planType);
                localStorage.setItem('dragonbible_customer_id', data.customerId);
                
                // Track successful payment
                if (window.DragonAnalytics) {
                    window.DragonAnalytics.trackPaymentSuccess(data.planType, data.amount);
                }
                
                // Show success message
                showPaymentSuccessModal(data.planType);
                
                // Unlock premium features
                unlockPremiumFeatures();
            }
        })
        .catch(error => {
            console.error('Verification error:', error);
        });
}

// Show payment success modal
function showPaymentSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content payment-success">
            <div class="success-icon">🐉✨</div>
            <h2>Welcome to the Dragon Riders!</h2>
            <p>Your payment was successful. You now have full access to:</p>
            <ul class="success-features">
                <li>✓ All 7 sacred books with 50+ chapters</li>
                <li>✓ Premium audio narration</li>
                <li>✓ Downloadable PDFs & EPUBs</li>
                <li>✓ Ad-free experience</li>
                <li>✓ Private Discord community</li>
                <li>✓ Early access to new content</li>
            </ul>
            <button class="btn btn-primary btn-large" onclick="closeSuccessModal()">
                Start Reading
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeSuccessModal() {
    const modal = document.querySelector('.payment-success');
    if (modal) {
        const parentModal = modal.closest('.modal');
        if (parentModal) {
            parentModal.remove();
        }
    }
    // Scroll to books section
    if (window.scrollToBooks) {
        window.scrollToBooks();
    }
}

// Unlock premium features
function unlockPremiumFeatures() {
    // Remove "upgrade to premium" messages
    document.querySelectorAll('.premium-only').forEach(el => {
        el.classList.remove('premium-only');
    });
    
    // Show premium badge
    const nav = document.querySelector('.nav-content');
    if (nav) {
        const badge = document.createElement('span');
        badge.className = 'premium-badge';
        badge.innerHTML = '👑 Premium';
        nav.appendChild(badge);
    }
    
    // Enable all features
    window.isPremiumUser = true;
}

// Check if user has active subscription
function checkSubscriptionStatus() {
    const subscription = localStorage.getItem('dragonbible_subscription');
    const customerId = localStorage.getItem('dragonbible_customer_id');
    
    if (subscription && customerId) {
        // Verify with backend that subscription is still active
        fetch(`/api/check-subscription/${customerId}`)
            .then(response => response.json())
            .then(data => {
                if (data.active) {
                    unlockPremiumFeatures();
                } else {
                    // Subscription expired or canceled
                    localStorage.removeItem('dragonbible_subscription');
                    localStorage.removeItem('dragonbible_customer_id');
                }
            })
            .catch(error => {
                console.error('Subscription check error:', error);
            });
    }
}

// Customer portal for managing subscription
async function openCustomerPortal() {
    const customerId = localStorage.getItem('dragonbible_customer_id');
    
    if (!customerId) {
        alert('No active subscription found');
        return;
    }
    
    try {
        const response = await fetch('/api/create-portal-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                returnUrl: window.location.origin,
            }),
        });
        
        const session = await response.json();
        
        if (session.url) {
            window.location.href = session.url;
        }
    } catch (error) {
        console.error('Portal error:', error);
        alert('Error opening customer portal');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Stripe
    initializeStripe();
    
    // Check subscription status
    checkSubscriptionStatus();
    
    // Check if returning from successful payment
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    if (sessionId) {
        handlePaymentSuccess(sessionId);
    }
});

// Export functions for use in other scripts
window.DragonPayment = {
    createCheckoutSession: createCheckoutSession,
    openCustomerPortal: openCustomerPortal,
    checkSubscriptionStatus: checkSubscriptionStatus,
    unlockPremiumFeatures: unlockPremiumFeatures
};

// Make closeSuccessModal globally available
window.closeSuccessModal = closeSuccessModal;
