// Dragon Bible - Referral Program System
// Viral growth through word-of-mouth rewards

class ReferralSystem {
    constructor() {
        this.referralCode = null;
        this.referralData = this.loadReferralData();
        this.init();
    }

    init() {
        // Generate referral code for user (if logged in)
        if (window.DragonAuth && window.DragonAuth.getCurrentUser()) {
            this.generateReferralCode();
        }

        // Track incoming referrals
        this.trackIncomingReferral();

        // Show referral UI to logged-in users
        this.displayReferralUI();
    }

    // Generate unique referral code for user
    generateReferralCode() {
        const user = window.DragonAuth.getCurrentUser();
        
        if (!user) return null;

        // Use user ID as base for referral code
        const code = this.encodeUserId(user.uid);
        this.referralCode = code;

        return code;
    }

    // Encode user ID into short referral code
    encodeUserId(uid) {
        // Create short, memorable code from UID
        const hash = this.hashString(uid);
        const code = hash.substring(0, 8).toUpperCase();
        return `DRAGON${code}`;
    }

    // Simple hash function
    hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(36);
    }

    // Track incoming referral from URL
    trackIncomingReferral() {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');

        if (ref) {
            // Store referrer code
            localStorage.setItem('referrer_code', ref);
            localStorage.setItem('referrer_timestamp', Date.now());

            // Show referral bonus message
            this.showReferralBonusMessage();

            // Track in analytics
            if (window.DragonAnalytics) {
                window.DragonAnalytics.trackReferralVisit(ref);
            }
        }
    }

    // Show bonus message to referred users
    showReferralBonusMessage() {
        const banner = document.createElement('div');
        banner.className = 'referral-bonus-banner';
        banner.innerHTML = `
            <div class="referral-bonus-content">
                <span class="bonus-icon">🎁</span>
                <div class="bonus-text">
                    <strong>Special Bonus!</strong> 
                    You were referred by a friend. Get <strong>1 month FREE</strong> when you subscribe!
                </div>
                <button class="bonus-close" onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(banner);

        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (banner.parentNode) {
                banner.remove();
            }
        }, 10000);
    }

    // Credit referrer when referred user subscribes
    async creditReferrer(referredUserId) {
        const referrerCode = localStorage.getItem('referrer_code');

        if (!referrerCode) return;

        try {
            // Call backend to credit referrer
            const response = await fetch('/api/credit-referral', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    referrerCode,
                    referredUserId,
                    timestamp: Date.now()
                })
            });

            const data = await response.json();

            if (data.success) {
                // Track successful referral
                if (window.DragonAnalytics) {
                    window.DragonAnalytics.trackReferralConversion(referrerCode);
                }

                // Clear referrer code (only credit once)
                localStorage.removeItem('referrer_code');
            }
        } catch (error) {
            console.error('Referral credit error:', error);
        }
    }

    // Load referral data from storage/server
    loadReferralData() {
        try {
            const saved = localStorage.getItem('referral_data');
            return saved ? JSON.parse(saved) : {
                totalReferrals: 0,
                successfulReferrals: 0,
                pendingReferrals: 0,
                totalEarned: 0,
                referralHistory: []
            };
        } catch (error) {
            return {
                totalReferrals: 0,
                successfulReferrals: 0,
                pendingReferrals: 0,
                totalEarned: 0,
                referralHistory: []
            };
        }
    }

    // Save referral data
    saveReferralData() {
        try {
            localStorage.setItem('referral_data', JSON.stringify(this.referralData));
        } catch (error) {
            console.error('Failed to save referral data:', error);
        }
    }

    // Display referral UI to logged-in users
    displayReferralUI() {
        const user = window.DragonAuth ? window.DragonAuth.getCurrentUser() : null;

        if (!user || !this.referralCode) return;

        // Add referral button to nav or profile
        this.addReferralButton();
    }

    // Add "Refer & Earn" button
    addReferralButton() {
        const navLinks = document.querySelector('.nav-links');

        if (!navLinks) return;

        const referralBtn = document.createElement('button');
        referralBtn.className = 'btn btn-accent';
        referralBtn.innerHTML = '🎁 Refer & Earn';
        referralBtn.onclick = () => this.showReferralModal();

        navLinks.insertBefore(referralBtn, navLinks.lastElementChild);
    }

    // Show referral modal with user's link
    showReferralModal() {
        const referralUrl = `${window.location.origin}/?ref=${this.referralCode}`;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'referralModal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="closeReferralModal()"></div>
            <div class="modal-content referral-modal">
                <button class="modal-close" onclick="closeReferralModal()">×</button>

                <div class="referral-header">
                    <div class="modal-icon">🎁</div>
                    <h2>Refer Friends, Earn Rewards</h2>
                    <p class="modal-subtitle">Share Dragon Bible and earn free months</p>
                </div>

                <div class="referral-rewards">
                    <h3>🎉 How It Works:</h3>
                    <div class="reward-steps">
                        <div class="reward-step">
                            <div class="step-number">1</div>
                            <div class="step-text">Share your unique link</div>
                        </div>
                        <div class="reward-step">
                            <div class="step-number">2</div>
                            <div class="step-text">Friend subscribes to Premium</div>
                        </div>
                        <div class="reward-step">
                            <div class="step-number">3</div>
                            <div class="step-text">You both get 1 month FREE!</div>
                        </div>
                    </div>
                </div>

                <div class="referral-link-container">
                    <label>Your Unique Referral Link:</label>
                    <div class="link-copy-box">
                        <input 
                            type="text" 
                            id="referralLinkInput" 
                            value="${referralUrl}" 
                            readonly
                            class="referral-link-input"
                        />
                        <button 
                            class="btn btn-primary"
                            onclick="copyReferralLink()"
                        >
                            📋 Copy
                        </button>
                    </div>
                </div>

                <div class="share-buttons">
                    <h3>Share via:</h3>
                    <div class="social-share">
                        <button class="share-btn twitter" onclick="shareOnTwitter('${referralUrl}')">
                            <span>🐦</span> Twitter
                        </button>
                        <button class="share-btn facebook" onclick="shareOnFacebook('${referralUrl}')">
                            <span>📘</span> Facebook
                        </button>
                        <button class="share-btn email" onclick="shareViaEmail('${referralUrl}')">
                            <span>✉️</span> Email
                        </button>
                        <button class="share-btn reddit" onclick="shareOnReddit('${referralUrl}')">
                            <span>🔴</span> Reddit
                        </button>
                    </div>
                </div>

                <div class="referral-stats">
                    <h3>Your Referral Stats:</h3>
                    <div class="stats-grid">
                        <div class="stat-box">
                            <div class="stat-number">${this.referralData.totalReferrals}</div>
                            <div class="stat-label">Total Referrals</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${this.referralData.successfulReferrals}</div>
                            <div class="stat-label">Successful</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">$${this.referralData.totalEarned}</div>
                            <div class="stat-label">Total Earned</div>
                        </div>
                    </div>
                </div>

                <div class="referral-terms">
                    <p><small>Rewards are credited when referred user subscribes and completes their first month. Free months can be stacked. No limit on referrals.</small></p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // Copy referral link to clipboard
    copyReferralLink() {
        const input = document.getElementById('referralLinkInput');
        input.select();
        document.execCommand('copy');

        // Show success message
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✅ Copied!';
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);

        // Track copy event
        if (window.DragonAnalytics) {
            window.DragonAnalytics.trackReferralLinkCopy();
        }
    }

    // Social sharing functions
    shareOnTwitter(url) {
        const text = "Check out The Dragon Bible - sacred texts reimagined through dragon mythology! 🐉 Get 1 month FREE with my link:";
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }

    shareOnFacebook(url) {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    }

    shareViaEmail(url) {
        const subject = "You'll love this - The Dragon Bible";
        const body = `Hey!\n\nI've been reading The Dragon Bible and thought you might love it. It's ancient texts (Genesis, Enoch, Gnostic) reimagined through dragon mythology.\n\nPretty mind-blowing stuff.\n\nUse my link to get 1 month FREE:\n${url}\n\nLet me know what you think!`;
        const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
    }

    shareOnReddit(url) {
        const title = "The Dragon Bible - Ancient texts reimagined through dragon mythology";
        const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        window.open(redditUrl, '_blank', 'width=800,height=600');
    }
}

// Initialize referral system
const referralSystem = new ReferralSystem();

// Global functions
window.ReferralSystem = referralSystem;
window.closeReferralModal = () => {
    const modal = document.getElementById('referralModal');
    if (modal) modal.remove();
};

window.copyReferralLink = () => referralSystem.copyReferralLink();
window.shareOnTwitter = (url) => referralSystem.shareOnTwitter(url);
window.shareOnFacebook = (url) => referralSystem.shareOnFacebook(url);
window.shareViaEmail = (url) => referralSystem.shareViaEmail(url);
window.shareOnReddit = (url) => referralSystem.shareOnReddit(url);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReferralSystem;
}
