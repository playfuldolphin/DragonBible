// Dragon Bible - Social Proof & Urgency System
// Live activity notifications, countdown timers, and conversion triggers

class SocialProofEngine {
    constructor() {
        this.notifications = [];
        this.currentNotification = null;
        this.notificationQueue = [];
        this.isShowing = false;
        this.userCount = 10247; // Update this periodically
        this.init();
    }

    init() {
        // Initialize notification data
        this.loadNotifications();
        
        // Start showing notifications after 10 seconds on page
        setTimeout(() => {
            this.startNotificationLoop();
        }, 10000);

        // Update user counter periodically
        this.animateUserCounter();
        
        // Track urgency countdowns
        this.initializeCountdowns();
        
        // Exit intent detection
        this.initializeExitIntent();
    }

    // Sample notification data (mix real + simulated for social proof)
    loadNotifications() {
        const names = [
            "Sarah M.", "John D.", "Michael T.", "Emma W.", "David L.",
            "Rachel K.", "James P.", "Lisa H.", "Chris B.", "Amanda R.",
            "Daniel S.", "Maria G.", "Ryan C.", "Jessica F.", "Alex N.",
            "Sophia V.", "Matthew J.", "Emily B.", "Joshua M.", "Olivia T."
        ];
        
        const locations = [
            "New York", "Los Angeles", "Chicago", "Seattle", "Austin",
            "Portland", "Denver", "Boston", "Atlanta", "Phoenix",
            "San Francisco", "Miami", "Nashville", "London", "Toronto",
            "Sydney", "Melbourne", "Dublin", "Amsterdam", "Berlin"
        ];
        
        const actions = [
            "just started reading Genesis Chapter 1",
            "just upgraded to Premium",
            "completed The Book of Enoch",
            "discovered their dragon archetype",
            "joined the Dragon Bible community",
            "just unlocked Lifetime Access",
            "started reading Exodus",
            "finished Genesis",
            "took the Dragon Quiz",
            "bookmarked their favorite verse",
            "just purchased Lifetime Access for $99",
            "subscribed to Premium ($9.99/month)"
        ];
        
        // Generate realistic notifications
        for (let i = 0; i < 50; i++) {
            const name = names[Math.floor(Math.random() * names.length)];
            const location = locations[Math.floor(Math.random() * locations.length)];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            this.notifications.push({
                name,
                location,
                action,
                time: this.getRandomTime(),
                icon: this.getIconForAction(action)
            });
        }
    }

    getRandomTime() {
        const minutes = Math.floor(Math.random() * 30) + 1;
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    getIconForAction(action) {
        if (action.includes('upgraded') || action.includes('purchased')) return '💎';
        if (action.includes('reading')) return '📖';
        if (action.includes('completed')) return '✅';
        if (action.includes('quiz')) return '🐉';
        if (action.includes('joined')) return '🎉';
        return '⭐';
    }

    startNotificationLoop() {
        this.showNextNotification();
        
        // Show new notification every 15-30 seconds
        setInterval(() => {
            if (!this.isShowing) {
                this.showNextNotification();
            }
        }, Math.random() * 15000 + 15000); // 15-30 seconds
    }

    showNextNotification() {
        if (this.isShowing) return;
        
        const notification = this.notifications[Math.floor(Math.random() * this.notifications.length)];
        this.displayNotification(notification);
    }

    displayNotification(data) {
        this.isShowing = true;
        
        // Create notification element
        const notif = document.createElement('div');
        notif.className = 'social-proof-notification';
        notif.innerHTML = `
            <div class="notif-icon">${data.icon}</div>
            <div class="notif-content">
                <div class="notif-name">${data.name} from ${data.location}</div>
                <div class="notif-action">${data.action}</div>
                <div class="notif-time">${data.time}</div>
            </div>
            <button class="notif-close" onclick="window.SocialProof.closeNotification()">×</button>
        `;
        
        document.body.appendChild(notif);
        
        // Animate in
        setTimeout(() => {
            notif.classList.add('show');
        }, 100);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            this.hideNotification(notif);
        }, 8000);
    }

    hideNotification(notif) {
        notif.classList.remove('show');
        setTimeout(() => {
            if (notif && notif.parentNode) {
                notif.remove();
            }
            this.isShowing = false;
        }, 500);
    }

    closeNotification() {
        const notif = document.querySelector('.social-proof-notification');
        if (notif) {
            this.hideNotification(notif);
        }
    }

    // Animate user counter
    animateUserCounter() {
        const counterElements = document.querySelectorAll('.user-count');
        
        counterElements.forEach(el => {
            const target = this.userCount;
            const duration = 2000; // 2 seconds
            const start = target - 100;
            const increment = (target - start) / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current).toLocaleString();
            }, 16);
        });
        
        // Slowly increment counter over time
        setInterval(() => {
            this.userCount += Math.floor(Math.random() * 3) + 1;
            counterElements.forEach(el => {
                el.textContent = this.userCount.toLocaleString();
            });
        }, 60000); // Every minute
    }

    // Countdown timer for urgency
    initializeCountdowns() {
        const countdownElements = document.querySelectorAll('[data-countdown]');
        
        countdownElements.forEach(el => {
            const endTime = el.getAttribute('data-countdown');
            if (endTime) {
                this.startCountdown(el, new Date(endTime));
            }
        });
    }

    startCountdown(element, endDate) {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = endDate - now;
            
            if (distance < 0) {
                element.innerHTML = "EXPIRED";
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            let html = '';
            if (days > 0) {
                html += `<span class="countdown-segment"><span class="countdown-number">${days}</span><span class="countdown-label">days</span></span>`;
            }
            html += `
                <span class="countdown-segment"><span class="countdown-number">${hours.toString().padStart(2, '0')}</span><span class="countdown-label">hrs</span></span>
                <span class="countdown-separator">:</span>
                <span class="countdown-segment"><span class="countdown-number">${minutes.toString().padStart(2, '0')}</span><span class="countdown-label">min</span></span>
                <span class="countdown-separator">:</span>
                <span class="countdown-segment"><span class="countdown-number">${seconds.toString().padStart(2, '0')}</span><span class="countdown-label">sec</span></span>
            `;
            
            element.innerHTML = html;
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Exit intent popup
    initializeExitIntent() {
        let hasShownExitIntent = sessionStorage.getItem('exit_intent_shown');
        
        if (hasShownExitIntent) return;
        
        document.addEventListener('mouseleave', (e) => {
            // Check if mouse is leaving at top of page
            if (e.clientY < 10 && !hasShownExitIntent) {
                this.showExitIntentPopup();
                hasShownExitIntent = true;
                sessionStorage.setItem('exit_intent_shown', 'true');
            }
        });
    }

    showExitIntentPopup() {
        const modal = document.createElement('div');
        modal.className = 'modal exit-intent-modal active';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="window.SocialProof.closeExitIntent()"></div>
            <div class="modal-content exit-intent-content">
                <button class="modal-close" onclick="window.SocialProof.closeExitIntent()">×</button>
                
                <div class="exit-intent-icon">⚠️</div>
                <h2>Wait! Before You Go...</h2>
                
                <p class="exit-intent-message">
                    You're about to miss out on <strong>40% OFF Lifetime Access</strong>
                </p>
                
                <div class="exit-offer">
                    <div class="exit-price">
                        <span class="price-before">$99</span>
                        <span class="price-now">$59</span>
                    </div>
                    <p class="exit-savings">Save $40 • One-time payment</p>
                </div>
                
                <div class="exit-features">
                    <p><strong>This exclusive offer includes:</strong></p>
                    <ul>
                        <li>✅ All 50+ chapters across 7 sacred books</li>
                        <li>✅ Premium audio narration</li>
                        <li>✅ Downloadable PDFs & EPUBs</li>
                        <li>✅ Ad-free experience</li>
                        <li>✅ Private Discord community</li>
                        <li>✅ ALL future content forever</li>
                    </ul>
                </div>
                
                <div class="exit-urgency">
                    <p>🔥 <strong>This offer expires in 10 minutes</strong></p>
                    <div class="countdown-mini" data-countdown-mini="10"></div>
                </div>
                
                <button class="btn btn-primary btn-large" onclick="window.SocialProof.acceptExitOffer()">
                    Claim 40% OFF Now
                </button>
                
                <button class="btn btn-secondary" onclick="window.SocialProof.closeExitIntent()">
                    No thanks, I'll pay full price later
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Start mini countdown
        this.startMiniCountdown(modal.querySelector('[data-countdown-mini]'), 10);
        
        // Track event
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackExitIntent();
        }
    }

    startMiniCountdown(element, minutes) {
        const endTime = new Date(Date.now() + minutes * 60 * 1000);
        
        const update = () => {
            const now = Date.now();
            const distance = endTime - now;
            
            if (distance < 0) {
                element.textContent = "Offer Expired";
                return;
            }
            
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);
            
            element.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        };
        
        update();
        setInterval(update, 1000);
    }

    acceptExitOffer() {
        // Apply discount code
        localStorage.setItem('discount_code', 'EXIT40');
        
        // Close modal
        this.closeExitIntent();
        
        // Scroll to pricing
        if (window.scrollToPricing) {
            window.scrollToPricing();
        }
        
        // Show confirmation
        alert('40% discount applied! Complete your purchase below.');
    }

    closeExitIntent() {
        const modal = document.querySelector('.exit-intent-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Scarcity counter (limited spots)
    showScarcityCounter(total = 500, remaining = null) {
        if (!remaining) {
            // Generate realistic remaining count
            remaining = Math.floor(Math.random() * 50) + 10;
        }
        
        const percentage = (remaining / total) * 100;
        
        return `
            <div class="scarcity-counter">
                <div class="scarcity-text">
                    <strong>${remaining}</strong> of ${total} Lifetime spots remaining at this price
                </div>
                <div class="scarcity-bar">
                    <div class="scarcity-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }

    // Live viewer count
    showLiveViewers() {
        const viewers = Math.floor(Math.random() * 20) + 15; // 15-35 viewers
        
        return `
            <div class="live-viewers">
                <span class="live-dot"></span>
                <span class="live-count">${viewers} people viewing this page right now</span>
            </div>
        `;
    }
}

// Initialize
const socialProof = new SocialProofEngine();

// Global access
window.SocialProof = socialProof;

// Helper functions
window.acceptExitOffer = () => socialProof.acceptExitOffer();
window.closeExitIntent = () => socialProof.closeExitIntent();
