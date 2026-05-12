/**
 * Dragon Bible - Advanced Analytics Tracking
 * 
 * This script tracks user behavior for conversion optimization
 * Works with Google Analytics 4
 */

// Initialize tracking
const DragonAnalytics = {
    // Track email capture
    trackEmailCapture: function(source) {
        if (typeof gtag === 'function') {
            gtag('event', 'email_signup', {
                'event_category': 'conversion',
                'event_label': source,
                'value': 0
            });
        }
        console.log('📧 Email captured from:', source);
    },

    // Track quiz events
    trackQuizStart: function() {
        if (typeof gtag === 'function') {
            gtag('event', 'quiz_start', {
                'event_category': 'engagement',
                'event_label': 'dragon_personality_quiz'
            });
        }
        console.log('🐲 Quiz started');
    },

    trackQuizComplete: function(dragonType) {
        if (typeof gtag === 'function') {
            gtag('event', 'quiz_complete', {
                'event_category': 'engagement',
                'event_label': dragonType,
                'dragon_type': dragonType
            });
        }
        console.log('✅ Quiz completed:', dragonType);
    },

    // Track book interactions
    trackBookOpen: function(bookName) {
        if (typeof gtag === 'function') {
            gtag('event', 'book_open', {
                'event_category': 'engagement',
                'event_label': bookName
            });
        }
        console.log('📖 Book opened:', bookName);
    },

    trackChapterRead: function(bookName, chapter, timeSpent) {
        if (typeof gtag === 'function') {
            gtag('event', 'chapter_read', {
                'event_category': 'engagement',
                'event_label': `${bookName}_chapter_${chapter}`,
                'value': Math.round(timeSpent / 1000) // seconds
            });
        }
        console.log(`⏱️ Read ${bookName} chapter ${chapter} for ${timeSpent}ms`);
    },

    // Track pricing interactions
    trackPricingView: function() {
        if (typeof gtag === 'function') {
            gtag('event', 'view_pricing', {
                'event_category': 'conversion_funnel',
                'event_label': 'pricing_section'
            });
        }
        console.log('💰 Pricing viewed');
    },

    trackUpgradeClick: function(plan) {
        if (typeof gtag === 'function') {
            gtag('event', 'upgrade_click', {
                'event_category': 'conversion',
                'event_label': plan,
                'value': plan === 'monthly' ? 9.99 : 99
            });
        }
        console.log('🚀 Upgrade clicked:', plan);
    },

    // Track social shares
    trackShare: function(platform, content) {
        if (typeof gtag === 'function') {
            gtag('event', 'share', {
                'event_category': 'social',
                'event_label': platform,
                'content_type': content
            });
        }
        console.log('📤 Shared on', platform, ':', content);
    },

    // Track scroll depth
    trackScrollDepth: function(depth) {
        if (typeof gtag === 'function') {
            gtag('event', 'scroll', {
                'event_category': 'engagement',
                'event_label': `${depth}%`,
                'value': depth
            });
        }
        console.log('📜 Scrolled:', depth + '%');
    },

    // Track CTA clicks
    trackCTAClick: function(ctaName, location) {
        if (typeof gtag === 'function') {
            gtag('event', 'cta_click', {
                'event_category': 'conversion',
                'event_label': ctaName,
                'location': location
            });
        }
        console.log('🎯 CTA clicked:', ctaName, 'at', location);
    },

    // Track audio usage
    trackAudioPlay: function(bookName, chapter) {
        if (typeof gtag === 'function') {
            gtag('event', 'audio_play', {
                'event_category': 'engagement',
                'event_label': `${bookName}_chapter_${chapter}`
            });
        }
        console.log('🔊 Audio played:', bookName, chapter);
    },

    // Track search (if implemented)
    trackSearch: function(searchTerm) {
        if (typeof gtag === 'function') {
            gtag('event', 'search', {
                'event_category': 'engagement',
                'search_term': searchTerm
            });
        }
        console.log('🔍 Search:', searchTerm);
    },

    // Track user properties
    setUserProperties: function() {
        const hasEmail = localStorage.getItem('dragonbible_email') ? 'yes' : 'no';
        const hasFreeAccess = localStorage.getItem('dragonbible_free_access') ? 'yes' : 'no';
        const dragonType = localStorage.getItem('dragonbible_dragon_type') || 'unknown';
        
        if (typeof gtag === 'function') {
            gtag('set', 'user_properties', {
                'has_email': hasEmail,
                'has_free_access': hasFreeAccess,
                'dragon_type': dragonType
            });
        }
    },

    // Track page timing
    trackTiming: function(category, variable, value, label) {
        if (typeof gtag === 'function') {
            gtag('event', 'timing_complete', {
                'name': variable,
                'value': value,
                'event_category': category,
                'event_label': label
            });
        }
    }
};

// Auto-track scroll depth
(function() {
    let scrollDepths = [25, 50, 75, 100];
    let trackedDepths = [];

    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollPercent = Math.floor((scrollTop / (documentHeight - windowHeight)) * 100);

        scrollDepths.forEach(function(depth) {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                DragonAnalytics.trackScrollDepth(depth);
            }
        });
    });
})();

// Auto-track time on page
(function() {
    let startTime = Date.now();
    
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - startTime;
        const timeInSeconds = Math.round(timeSpent / 1000);
        
        DragonAnalytics.trackTiming(
            'engagement',
            'time_on_page',
            timeInSeconds,
            document.title
        );
    });
})();

// Track outbound links
(function() {
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.hostname !== window.location.hostname) {
            if (typeof gtag === 'function') {
                gtag('event', 'click', {
                    'event_category': 'outbound',
                    'event_label': link.href,
                    'transport_type': 'beacon'
                });
            }
            console.log('🔗 Outbound click:', link.href);
        }
    });
})();

// Track visibility/engagement
(function() {
    let visibilityChangeTime = Date.now();
    let totalTimeVisible = 0;

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Tab/window lost focus
            totalTimeVisible += Date.now() - visibilityChangeTime;
        } else {
            // Tab/window regained focus
            visibilityChangeTime = Date.now();
        }
    });

    window.addEventListener('beforeunload', function() {
        if (!document.hidden) {
            totalTimeVisible += Date.now() - visibilityChangeTime;
        }
        
        const activeTimeSeconds = Math.round(totalTimeVisible / 1000);
        DragonAnalytics.trackTiming(
            'engagement',
            'active_time',
            activeTimeSeconds,
            'user_actively_viewing'
        );
    });
})();

// Set user properties on load
document.addEventListener('DOMContentLoaded', function() {
    DragonAnalytics.setUserProperties();
    
    // Track when pricing comes into view
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    DragonAnalytics.trackPricingView();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(pricingSection);
    }
});

// Export for use in other scripts
window.DragonAnalytics = DragonAnalytics;

console.log('📊 Dragon Analytics loaded');
